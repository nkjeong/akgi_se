package com.akgi.web.option;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OptionService {

    @Autowired
    private OptionRepository optionRepository;

    public Optional<Option> getOptionByCode(String code) {
        return optionRepository.findByCode(code);
    }
}