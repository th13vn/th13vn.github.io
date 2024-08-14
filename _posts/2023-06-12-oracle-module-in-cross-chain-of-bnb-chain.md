---
title: Oracle Module in Cross Chain of BNB chain
description: Byzantine Fault Tolerance (BFT) ensures reliable consensus in distributed systems, even with faulty or malicious nodes, by leveraging algorithms that involve node selection, proposal, voting, and decision phases to achieve agreement on a consistent state.
author: th13vn
date: 2023-06-12 00:02:00 +0700
categories: [Learning]
tags: [BNB, Oracle, CrossChain]
image:
  path: https://github.com/th13vn/th13vn.github.io/assets/47786126/852c32d8-b085-45d7-938d-eadad90574d4
  alt: BC and BSC interact
---


## Oracle relayer

~~? Tại sao set key manager is nil? → keyword defer~~

Khá impact. có thể update db! Nhưng giả sử mình là 1 node trong đó thì sao? thao túng được tất  cả hay không? có cơ chế nào tránh sự thao túng này không? ← check oracle module

Query seq:

- Gen key: prefix 1 byte, chain id 2 byte, channel id 1 byte
- ABCI query store: /store/sc/key + key

Claim cross chain package log:

- where `oracle_sequence = ? and chain_id = ? and status = ?`

Get prophecy:

- Gen key: GetClaimId(`chainId, channelId, sequence`)
- ABCI query: /store/oracle/key + key

append package

claim execute. → broadcast

## Oracle module

- route.go
    
    
- handler.go
    
    `handleClaimMsg`:
    
    New claim include: 
    
    - claim id (msg.chainid, channelID, msg.Sequence)
    - validator address
    - msg.payload
    
    Get seq ← key value store in keeper
    
    REQUIRE: msg.seq == seq
    
    ProccessClaim ← keeper.go
    
    fail → delete
    
    not success → return
    
    decode payload from string to packages[]
    
    handlePackage(ctx, oracleKeeper, chainID, &pack)
    
    ….
    
    `handlePackage`:
    
    `executeClaim`:
    
- keeper.go
    
    `ProcessClaim`:
    
    Check valid oracle validator
    
    REQUIRE: claim≠”” && len(claim.Payload)≠0
    
    GetProphecy(ctx, claim.ID) ← claim was controlled by oracle relayer
    
    - Prophecy is not found → create new Prophecy
    
    REQUIRE: prophecy status is pending
    
    Add claim (validator address, claim.payload)
    
    Proccess Completion ← important
    
    return Prophecy
    
    `processCompletion`:
    
    call highest claim ← highest claim, highest power, total claims power, total power
        
    why do highestConsensusRatio and highestPossibleConsensusRatio equal 0?
    
    (!) The precision-adjusted value of the quo() function is 8. Except when highestClaimPower is 0, the result is always 0.
    
    get `consensusNeeded` ← kv store
    
    if `highestConsensusRatio` ≥ `consensusNeeded` → set status success, set claim
    
    else `highestPossibleConsensusRatio` ≤ `consensusNeeded` → fail
    
    return prophecy
    
- prophecy.go
    
    `Addclaim`:
    
    Add claimPayload to map ValidatorClaims[valAddr]
    
    Add addr to map ClaimValidators[claimPayload][]
        
    `FindHighestClaim`:
    
    Get Power of oracle relayer
    
    for each validators of map claimValidators:
    
    - accure claim power of this claim to find highest claim
    - total all claims power
    
    total power ← all power of validators
    
    `return highestClaim, highestClaimPower, totalClaimsPower, totalPower`
    
![Oracle module Flow](https://github.com/th13vn/th13vn.github.io/assets/47786126/64fc4082-fb71-4cde-8f1b-8f873705b68f)
Oracle module Flow