package com.akgi.web.calendar;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/calendar")
public class GatCalendar {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getCurrentDate() {
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int date = calendar.get(Calendar.DATE);
        int day = calendar.get(Calendar.DAY_OF_WEEK);

        String toDay = "";
        switch(day) {
            case 1 : toDay = "SUNDAY"; break;
            case 2 : toDay = "MONDAY"; break;
            case 3 : toDay = "TUESDAY"; break;
            case 4 : toDay = "WEDNESDAY"; break;
            case 5 : toDay = "THURSDAY"; break;
            case 6 : toDay = "FRIDAY"; break;
            case 7 : toDay = "SATURDAY"; break;
        }

        String reMonth = String.format("%02d", month);
        String reDate = String.format("%02d", date);

        Map<String, Object> response = new HashMap<>();
        response.put("year", year);
        response.put("month", reMonth);
        response.put("date", reDate);
        response.put("day", day);
        response.put("toDay", toDay);

        return ResponseEntity.ok(response);
    }
}
