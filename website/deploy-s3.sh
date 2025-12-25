#!/bin/bash

# Fabrknt Website - AWS S3 Deployment Script
# Usage: ./deploy-s3.sh <bucket-name>

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if bucket name is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Bucket name required${NC}"
    echo "Usage: ./deploy-s3.sh <bucket-name>"
    echo "Example: ./deploy-s3.sh fabrknt-website"
    exit 1
fi

BUCKET_NAME=$1
REGION=${AWS_REGION:-us-east-1}

echo -e "${BLUE}🚀 Deploying Fabrknt website to S3...${NC}"
echo -e "Bucket: ${GREEN}$BUCKET_NAME${NC}"
echo -e "Region: ${GREEN}$REGION${NC}"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

# Check if bucket exists, create if it doesn't
echo -e "${BLUE}Checking if bucket exists...${NC}"
if ! aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
    echo -e "${GREEN}✓ Bucket exists${NC}"
else
    echo -e "${BLUE}Creating bucket...${NC}"
    aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
    echo -e "${GREEN}✓ Bucket created${NC}"
fi

# Configure bucket for static website hosting
echo -e "${BLUE}Configuring static website hosting...${NC}"
aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html

# Set bucket policy for public read access
echo -e "${BLUE}Setting bucket policy...${NC}"
cat > /tmp/bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy file:///tmp/bucket-policy.json

rm /tmp/bucket-policy.json

# Sync files to S3
echo -e "${BLUE}Uploading files...${NC}"
aws s3 sync . "s3://$BUCKET_NAME" \
    --exclude ".git/*" \
    --exclude "*.sh" \
    --exclude "*.md" \
    --exclude "vercel.json" \
    --exclude "netlify.toml" \
    --exclude "amplify.yml" \
    --exclude "cloudformation.yml" \
    --cache-control "public, max-age=31536000" \
    --delete

# Set cache control for HTML files (don't cache)
echo -e "${BLUE}Setting cache control for HTML files...${NC}"
aws s3 cp "s3://$BUCKET_NAME/index.html" "s3://$BUCKET_NAME/index.html" \
    --metadata-directive REPLACE \
    --cache-control "public, max-age=0, must-revalidate" \
    --content-type "text/html"

# Set MIME types for assets
echo -e "${BLUE}Setting MIME types...${NC}"
aws s3 cp "s3://$BUCKET_NAME/assets/css/" "s3://$BUCKET_NAME/assets/css/" \
    --recursive \
    --metadata-directive REPLACE \
    --content-type "text/css" \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*" --include "*.css"

aws s3 cp "s3://$BUCKET_NAME/assets/js/" "s3://$BUCKET_NAME/assets/js/" \
    --recursive \
    --metadata-directive REPLACE \
    --content-type "application/javascript" \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*" --include "*.js"

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "Website URL: ${GREEN}http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Set up CloudFront for HTTPS and better performance"
echo "2. Configure your custom domain (fabrknt.com)"
echo "3. Run: aws cloudformation deploy --template-file cloudformation.yml --stack-name fabrknt-website"
