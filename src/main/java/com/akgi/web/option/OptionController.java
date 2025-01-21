package com.akgi.web.option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/options")
public class OptionController {

    @Autowired
    private OptionService optionService;

    @GetMapping("/{code}")
    public ResponseEntity<Option> getOptionByCode(@PathVariable String code) {
        return optionService.getOptionByCode(code)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}