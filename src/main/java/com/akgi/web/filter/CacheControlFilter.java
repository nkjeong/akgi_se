package com.akgi.web.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CacheControlFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // 필터 초기화 로직 (필요하다면)
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse httpResp = (HttpServletResponse) response;
        httpResp.setHeader("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate"); // 캐시를 완전히 방지하는 설정
        ((HttpServletResponse) response).setDateHeader("Expires",0);
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // 필터 소멸 로직 (필요하다면)
    }
}