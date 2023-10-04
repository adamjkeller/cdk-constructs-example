import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as iam from "aws-cdk-lib/aws-iam";

export class L1CdkConstructDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //L1
    const l1IamRole = new iam.CfnRole(this, "L1IamRole", {
      assumeRolePolicyDocument: {
        Statement: [
          {
            Action: "sts:AssumeRole",
            Effect: "Allow",
            Principal: {
              Service: "lambda.amazonaws.com",
            },
          },
        ],
      },
      managedPolicyArns: [
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
      ],
    });

    const l1Function = new lambda.CfnFunction(this, "L1Function", {
      code: {
        s3Bucket: "test",
        s3Key: "test.zip",
      },
      role: l1IamRole.attrArn,
      handler: "index.handler",
    });

    const l1Bucket = new s3.CfnBucket(this, "CFNBucket", {
      bucketName: "cfn-bucket",
    });

    const l1BucketLambdaAccess = new iam.CfnPolicy(
      this,
      "L1BucketLambdaAccess",
      {
        policyDocument: {
          Statement: [
            {
              Action: ["s3:GetObject", "s3:GetObjectVersion"],
              Effect: "Allow",
              Resource: l1Bucket.attrArn,
            },
          ],
        },
        policyName: "L1BucketLambdaAccess",
        roles: [l1Function.ref],
      }
    );
  }
}
