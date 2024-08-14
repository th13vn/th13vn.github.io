---
title: ERC-4626 Tokenized Vault Standard 
description: Security considerations for ERC-4626 Vaults include consistent view functions, managing slippage, and cautious custom implementations.
author: th13vn
date: 2023-06-13 00:00:00 +0700
categories: [AuditNote]
tags: [erc4626, audit]
---

# Table of contents

- [Table of contents](#table-of-contents)
- [General](#general)
  - [Basic Concept](#basic-concept)
  - [Functions](#functions)
    - [View](#view)
    - [Mutable state](#mutable-state)
  - [Best practice](#best-practice)
- [Security Considerations](#security-considerations)
  - [View functions are inconsistent lead to miscalculate amount shares/assets](#view-functions-are-inconsistent-lead-to-miscalculate-amount-sharesassets)
  - [Slippage on deposit/withdrawal](#slippage-on-depositwithdrawal)
  - [Be careful with all of CREATIVITY IMPLEMENTATION](#be-careful-with-all-of-creativity-implementation)
  - [Helpful link](#helpful-link)

# General

## Basic Concept

The ERC-4626, also known as tokenized Vault, is an implementation of an ERC-20 token representing shares. The Vault holds a single asset as the underlying ERC-20 token.

The ERC-4626 Vault provides basic functionality for depositing and withdrawing tokens and viewing balances.

- `share`: The token of the Vault. Has a ratio of underlying assets exchanged on mint/deposit/withdraw/redeem (as defined by the Vault).
- `asset`: The underlying token managed by the Vault. Has units defined by the corresponding EIP-20 contract.
- `fee` (optional): Amount token of asset or share charged to the user by the Vault.
- `slippage` (should have): Any difference between advertised share price and economic realities of deposit to or withdrawal from the Vault, which is not accounted by fees.

## Functions

### View

- `convertToShares`, `previewDeposit`: Have same functionality that calculate amount of shares when deposit amount of assets.
- `previewMint`: Give amount of shares and output is amount of assets needed deposit.
- `convertToAssets`, `previewRedeem`: Have same functionality that calculate amount of assets when deposit amount of shares.
- `previewWithdraw`:  Give amount of withdrawal assets and output is amount of share needed.

### Mutable state

- `deposit`, `mint`: Deposit asset and receive share.
- `withdraw`, `redeem`: Withdraw asset and burn share.

## Best practice

- All ERC-4626 tokenized Vaults MUST implement EIP-20 to represent shares.
- All ERC-4626  tokenized Vaults MUST implement EIP-20’s optional metadata extensions.
- The name and symbol functions SHOULD reflect the underlying token’s name and symbol in some way.
- MAY revert on calls to `transfer` or `transferFrom` when a Vault is to be non-transferrable.
- EIP-4626 tokenized Vaults MAY implement [ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) to improve the UX of approving shares on various integrations.

#  Security Considerations

Most security issues arise when the ratio of asset to share is greater than 1.

## View functions are inconsistent lead to miscalculate amount shares/assets

Check the ratio and conversion formulas.

Ensure proper rounding, accounting for decimals, consistent calculations,...

## Slippage on deposit/withdrawal

Check the minimum reception amount of shares/assets when depositing or withdrawing.

## Be careful with all of CREATIVITY IMPLEMENTATION

Avoid incorrect overriding of functions.

Ensure consistency in function overrides.

## Helpful link
- https://www.arbitraryexecution.com/blog/shared-vulnerabilities-between-erc-4626-vaults-and-vault-like-contracts-deep-dive-part-1
- https://www.arbitraryexecution.com/blog/shared-vulnerabilities-between-erc-4626-vaults-and-vault-like-contracts-deep-dive-part-2
- https://www.arbitraryexecution.com/blog/shared-vulnerabilities-between-erc-4626-vaults-and-vault-like-contracts-deep-dive-part-3