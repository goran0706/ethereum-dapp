export default [
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_tokens',
        type: 'address[]'
      },
      {
        internalType: 'uint256',
        name: '_minUnlockTime',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_exitFeePercentage',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'TokenAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'TokenRemoved',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'unlockTime',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'unlocked',
        type: 'bool'
      }
    ],
    name: 'TokensLocked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beneficiary',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256'
      }
    ],
    name: 'TokensUnlocked',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'addToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'cRegistry',
    outputs: [
      {
        internalType: 'contract ContractRegistry',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'exitFeePercentage',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_lockIndex',
        type: 'uint256'
      }
    ],
    name: 'getLockDetails',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'beneficiary',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'unlockTime',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'unlocked',
            type: 'bool'
          }
        ],
        internalType: 'struct Locking.Lock',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address'
      }
    ],
    name: 'getLocksCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTokens',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTokensCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'tokens',
        type: 'address[]'
      }
    ],
    name: 'importTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'isSupported',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_unlockTime',
        type: 'uint256'
      }
    ],
    name: 'lockTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'lockedBalances',
    outputs: [
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'unlockTime',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'unlocked',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'minUnlockTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      }
    ],
    name: 'removeToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_minUnlockTime',
        type: 'uint256'
      }
    ],
    name: 'setMinUnlockTime',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_withdrawalFee',
        type: 'uint256'
      }
    ],
    name: 'setWithdrawalFee',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_beneficiary',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_lockIndex',
        type: 'uint256'
      }
    ],
    name: 'unlockTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
