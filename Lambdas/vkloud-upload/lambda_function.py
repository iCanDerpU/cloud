import boto3
import base64
import os
from datetime import datetime

def lambda_handler(event, context):
    base64_image = event['body']['file']
    image_bytes = base64.b64decode(base64_image)
    current_time = datetime.now().timestamp()
    file_name = f"uploads/{current_time}.png"
    s3_bucket_name = os.getenv('BUCKET_NAME')
    s3 = boto3.client('s3')
    try:
        s3.put_object(Bucket=s3_bucket_name, Key=file_name, Body=image_bytes)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': f"Successfully uploaded {file_name} to {s3_bucket_name}"
        }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
            },
            'body': "Error uploading the image"
        }
