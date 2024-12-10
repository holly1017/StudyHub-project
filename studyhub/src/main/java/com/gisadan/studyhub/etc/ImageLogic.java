package com.gisadan.studyhub.etc;

import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

public class ImageLogic {
    /**
     * 파일의 확장자를 확인하기 위한 메소드
     * @param file 확인하고자 하는 파일을 입력
     * @return 해당 파일의 확장자
     */
    public static String getFileExtension(File file) {
        String name = file.getName();
        return name.substring(name.lastIndexOf('.') + 1).toLowerCase();
    }

    /**
     * 이미지 확장자를 고려하여 MediaType을 return한다.
     * @param extension 이미지 확장자
     * @return MediaType
     */
    public static MediaType getMediaType(String extension) {
        switch (extension) {
            case "jpg":
            case "jpeg":
                return MediaType.IMAGE_JPEG;
            case "png":
                return MediaType.IMAGE_PNG;
            case "gif":
                return MediaType.IMAGE_GIF;
            default:
                return MediaType.APPLICATION_OCTET_STREAM; // 기본값
        }
    }

    /**
     * 요청받은 파일명을 분리하여 날짜와 시간을 파일명에 붙힘
     * @param file 요청받은 MultipartFile 타입의 파일
     * @return 날짜와 시간이 더해진 파일명
     */
    private static String fileNameSplit(MultipartFile file) {
        String fileName = "";

        if (file != null && !file.isEmpty()) {
            String[] parts = file.getOriginalFilename().split("\\.");
            String baseName = String.join("-", Arrays.copyOfRange(parts, 0, parts.length - 1));
            String extension = parts[parts.length - 1];
            String currentDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss"));
            fileName = baseName.replace(".", "-") + "-" + currentDateTime + "." + extension;
        }
        return fileName;
    }

    /**
     * 요청받은 파일명을 분리하여 회원아이디를 파일명에 붙힘
     * @param file 요청받은 MultipartFile 타입의 파일
     * @return 회원아이디 더해진 파일명
     */
    private static String profileNameSplit(MultipartFile file, String memberId) {


        if (file != null && !file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            if (fileName != null && fileName.contains(".")) {
                String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
                return memberId + "." + extension;
            }
        }
        return "";
    }

    /**
     * 파일 저장을 위한 메서드
     * @param file 요청받은 MultipartFile 타입의 변수
     * @return 저장한 파일명
     */
    public static String saveFile(MultipartFile file) {
        String uploadDir = System.getProperty("user.dir") + "/uploads/";
        File uploadDirectory = new File(uploadDir);

        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        String fileName = fileNameSplit(file);

        try {
            if (file != null && !file.isEmpty()) {
                File destinationFile = new File(uploadDir + fileName);
                file.transferTo(destinationFile);
            }
        } catch (IOException e) {
            return "";
        }

        return fileName;
    }

    /**
     * 프로필 파일 저장을 위한 메서드
     * @param file 요청받은 MultipartFile 타입의 변수
     * @return 저장한 파일명
     */
    public static String saveProfile(MultipartFile file, String memberId) {
        String uploadDir = System.getProperty("user.dir") + "/uploads/user/";
        File uploadDirectory = new File(uploadDir);

        if (!uploadDirectory.exists()) {
            uploadDirectory.mkdirs();
        }

        String fileName = profileNameSplit(file, memberId);

        try {
            if (file != null && !file.isEmpty()) {
                File destinationFile = new File(uploadDir + fileName);
                file.transferTo(destinationFile);
            }
        } catch (IOException e) {
            return "";
        }

        return fileName;
    }
}
