package com.gisadan.studyhub.controller;

import com.gisadan.studyhub.dto.reponse.ResStudyBoardListDto;
import com.gisadan.studyhub.etc.ImageLogic;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class EtcController {
    @Operation(summary = "서버에 저장되어있는 이미지를 출력", description = "서버에 저장되어있는 이미지를 출력하기 위한 REST API", tags = {"ETC"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Resource.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/uploads/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/";
            Path filePath = Paths.get(uploadDir).resolve(imageName).normalize();
            File file = filePath.toFile();

            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            String fileExtension = ImageLogic.getFileExtension(file);
            MediaType mediaType = ImageLogic.getMediaType(fileExtension);

            Resource resource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "서버에 저장되어있는 사용자 이미지를 출력", description = "서버에 저장되어있는 사용자 이미지를 출력하기 위한 REST API", tags = {"ETC"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = Resource.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/uploads/user/{imageName}")
    public ResponseEntity<Resource> getProfileImage(@PathVariable String imageName) {
        try {
            String uploadDir = System.getProperty("user.dir") + "/uploads/user";
            Path filePath = Paths.get(uploadDir).resolve(imageName).normalize();
            File file = filePath.toFile();

            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            String fileExtension = ImageLogic.getFileExtension(file);
            MediaType mediaType = ImageLogic.getMediaType(fileExtension);

            Resource resource = new FileSystemResource(file);
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "서버에 이미지를 저장", description = "서버에 이미지를 저장하기 위한 REST API", tags = {"ETC"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/image/uploads")
    public ResponseEntity<String> setImage(@RequestPart MultipartFile file) {
        System.out.println(file);
        return new ResponseEntity<>("http://localhost:8080/uploads/" + ImageLogic.saveFile(file), HttpStatus.OK);
    }
}
