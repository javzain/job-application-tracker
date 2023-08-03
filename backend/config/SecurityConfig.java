package com.zain.jobtracker.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.zain.jobtracker.service.CustomUserDetailsService;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        SimpleUrlAuthenticationFailureHandler handler = new SimpleUrlAuthenticationFailureHandler();
        handler.setUseForward(true);
        handler.setDefaultFailureUrl("/login?error=true");
        return handler;
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://127.0.0.1:5500")); // React server
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .cors().configurationSource(corsConfigurationSource())
            .and()
            .authenticationProvider(authenticationProvider())
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers(registerPostRequestMatcher()).permitAll()
                .requestMatchers(HttpMethod.POST, "/login").permitAll()
                .anyRequest().authenticated())
            .formLogin(login -> login
                .loginProcessingUrl("/login")
                .permitAll()
                .failureHandler((request, response, exception) -> {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write("Invalid username or password.");
                })
                .successHandler((request, response, authentication) -> {
                    response.setStatus(HttpStatus.OK.value());
                    response.getWriter().write("Login successful.");
                })
                .defaultSuccessUrl("/tracker/getAllApps", true))
            .logout(logout -> logout.permitAll());
        return http.build();
    }

    @Bean
    public RequestMatcher registerPostRequestMatcher() {
        return new RequestMatcher() {
            @Override
            public boolean matches(HttpServletRequest request) {
                String uri = "/tracker/register";
                String method = HttpMethod.POST.toString();
                return method.equals(request.getMethod()) && uri.equals(request.getRequestURI());
            }
        };
    }
}












