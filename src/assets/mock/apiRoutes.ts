import { Permission } from "../../app/domain/models/permisssion.model";

interface Policy {
  policyId: number;
  policyName: string;
  permissions: Permission[];
}



const normalUserPolicies: Permission[] = [
  {
    "action": ["GET", "POST"],
    "resource": "users/{self}",
    "effect": "allow"
  },
  {
    "action": ["POST"],
    "resource": "User/{self}",
    "effect": "allow"
  },
  {
    "action": ["PUT"],
    "resource": "User/{self}/name&password",
    "effect": "allow"
  },
  {
    "action": ["GET", "POST", "DELETE"],
    "resource": "Requests/{self}",
    "effect": "allow"
  },
];

export function getUserPermissions(token: string): Permission[] {
  return normalUserPolicies;
}

//-----------------------------------------------

const policies = {
  "users-policies": [
    {
      "userId": 5,
      "username": "João",
      "policies": [
        {
          "policyId": 1,
          "policyName": "users",
          "permissions": [
            {
              "action": ["GET", "POST"],
              "resource": "users/{self}",
              "effect": "allow"
            },
            {
              "action": "POST",
              "resource": "User/{self}",
              "effect": "allow"
            },
            {
              "action": "PUT",
              "resource": "User/{self}/name&password",
              "effect": "allow"
            }
          ]
        },
        {
          "policyId": 2,
          "policyName": "products",
          "permissions": [
            {
              "action": "GET",
              "resource": "Product/*"
            }
          ]
        },
        {
          "policyId": 3,
          "policyName": "login",
          "permissions": [
            {
              "action": "POST",
              "resource": "login",
              "effect": "allow"
            }
          ]
        }
      ]
    }
  ],
  "login": [
    {
      "action": "POST",
      "resource": "login",
      "effect": "allow"
    }
  ],
  "users": [
    {
      "action": ["GET", "POST"],
      "resource": "users/{self}",
      "effect": "allow"
    },
    {
      "action": "POST",
      "resource": "User/{self}",
      "effect": "allow"
    },
    {
      "action": "PUT",
      "resource": "User/{self}/name&password",
      "effect": "allow"
    }
  ]
}
