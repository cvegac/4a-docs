package com.mintic.product_ms.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@ResponseBody
public class InsufficientQuantityAdvice {
    @ResponseBody
    @ExceptionHandler(InsufficientQuantityException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String InsufficientQuantityAdvice(InsufficientQuantityException ex){
        return ex.getMessage();
    }
}
