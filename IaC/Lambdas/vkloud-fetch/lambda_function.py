import json
import boto3

def lambda_handler(event, context):
    s3_client = boto3.client('s3')
    
    response = s3_client.list_objects_v2(
        Bucket='vkaramoutas-cloud',
        Prefix='uploads/'
    )
    
    file_names = []
    for i in range(len(response['Contents'])):
        file_names.append(response['Contents'][i]['Key'])
    
    return file_names
