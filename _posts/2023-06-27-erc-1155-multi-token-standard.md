---
title: ERC-1155 Multi Token Standard
description: This introduction to ERC1155 highlights its unique ability to handle both fungible and non-fungible tokens within a single contract, contrasting it with ERC721, and emphasizing its flexibility. The audit checklist ensures a comprehensive security review, focusing on access control, external calls, token supply management, batch operations, metadata validation, error handling, and third-party dependencies.
author: th13vn
date: 2023-06-27 00:01:00 +0700
categories: [AuditNote]
tags: [erc1155, audit, checklist]
---

## Introduction

ERC1155 is a token standard on Ethereum that combines the functionalities of ERC20 and ERC721 within a single contract. In ERC1155, each token type is represented by a unique identifier called `id`. By calling the `balanceOf(address, id)` function, you can retrieve the balance of tokens belonging to a specific address and token type. This powerful feature allows for the management of both fungible and non-fungible tokens in a unified and efficient manner.

Another use case, ERC1155 can be applied to create an enhanced version of ERC721. The enhancement lies in the fact that each NFT within the contract is stored with a quantity instead of being singular like in traditional ERC721. This can be referred to as "Semi-NFT".

I rare see the fist use case, but the second is very common.

## Audit checklist ERC1155

- [ ]  Access Control:
    - [ ]  Are access control mechanisms properly implemented?
    - [ ]  Are sensitive functions restricted to authorized parties?
    
- [ ]  External Calls:
    - [ ]  Are external calls made securely, considering potential vulnerabilities like reentrancy attacks?
    - [ ]  Is input validation performed to prevent unexpected behavior or malicious calls?
    - [ ]  Is error handling robust to handle potential failures or exceptions?
    
- [ ]  Token Supply Management:
    - [ ]  Are checks in place to prevent integer overflow/underflow during token supply management?
    - [ ]  Is the supply of tokens properly tracked and controlled to prevent unauthorized minting or burning?
    
- [ ]  Batch Operations:
    - [ ]  If the contract supports batch operations, are edge cases and validations adequately addressed?
    - [ ]  Does a failure in one token transfer within a batch affect the entire batch or lead to unexpected behavior?

- [ ]  Metadata Validation:
    - [ ]  Are proper checks in place to validate and ensure the integrity of metadata extensions?
    - [ ]  Are measures taken to prevent manipulation or injection of malicious data in the metadata?

- [ ]  Error Handling and Logging:
    - [ ]  Is error handling comprehensive, providing informative messages to users?
    - [ ]  Are critical events logged for transparency, monitoring, and troubleshooting purposes?

- [ ]  Third-Party Dependencies:
    - [ ]  Are external libraries or oracles used in the contract properly audited for security?
    - [ ]  Do these dependencies introduce any additional vulnerabilities or unauthorized access points?