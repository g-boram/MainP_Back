package org.com.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class S3Service {

  private final AmazonS3 s3Client;

  @Value("${cloud.aws.s3.bucketName}")
  private String bucketName;

  public S3Service(
      @Value("${cloud.aws.credentials.accessKey}") String accessKey,
      @Value("${cloud.aws.credentials.secretKey}") String secretKey,
      @Value("${cloud.aws.region.static}") String region) {
    BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
    this.s3Client = AmazonS3ClientBuilder.standard()
        .withRegion(region)
        .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
        .build();
  }

  public String uploadFile(MultipartFile file) {
    validateFile(file);

    String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentLength(file.getSize());
    metadata.setContentType(file.getContentType());

    try (InputStream inputStream = file.getInputStream()) {
      s3Client.putObject(bucketName, fileName, inputStream, metadata);
    } catch (IOException e) {
      throw new RuntimeException("Error uploading file to S3", e);
    }

    return s3Client.getUrl(bucketName, fileName).toString();
  }

  private void validateFile(MultipartFile file) {
    if (file.isEmpty()) {
      throw new IllegalArgumentException("Cannot upload an empty file");
    }
    if (file.getSize() > 10 * 1024 * 1024) { // 10MB 제한
      throw new IllegalArgumentException("File size exceeds the limit of 10MB");
    }
  }

  // 파일 삭제 메서드
  public void deleteFile(String fileUrl) {
    // fileUrl에서 파일 이름을 추출해야 함. 예: "https://s3.amazonaws.com/bucket-name/path/to/file.jpg"
    if (fileUrl != null && !fileUrl.isEmpty()) {
      // S3 파일 경로를 잘라내서 객체 키로 변환
      String fileName = fileUrl.substring(fileUrl.indexOf(bucketName) + bucketName.length() + 1);

      try {
        // 파일을 삭제하는 요청
        s3Client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
        System.out.println("File deleted successfully from S3: " + fileName);
      } catch (Exception e) {
        e.printStackTrace();
        System.err.println("Failed to delete file from S3: " + fileUrl);
      }
    } else {
      System.err.println("Invalid file URL: " + fileUrl);
    }
  }
}
