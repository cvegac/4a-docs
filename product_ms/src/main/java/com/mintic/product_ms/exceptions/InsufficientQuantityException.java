package com.mintic.product_ms.exceptions;

public class InsufficientQuantityException extends RuntimeException{
    public InsufficientQuantityException(String message){
        super(message);
    }
}
