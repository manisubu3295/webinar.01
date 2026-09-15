package com.aadhirai.billing;

import com.aadhirai.billing.model.Customer;
import com.aadhirai.billing.model.Product;
import com.aadhirai.billing.repository.CustomerRepository;
import com.aadhirai.billing.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;

@SpringBootApplication
public class BillingApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingApplication.class, args);
	}

	@Bean
	CommandLineRunner seedData(ProductRepository productRepository, CustomerRepository customerRepository,
								@Value("${server.port:8080}") String port) {
		return args -> {
			productRepository.save(new Product("P001", "Basmati Rice 5kg", new BigDecimal("450.00"), new BigDecimal("0.05")));
			productRepository.save(new Product("P002", "Sunflower Oil 1L", new BigDecimal("180.00"), new BigDecimal("0.18")));
			productRepository.save(new Product("P003", "Toothpaste 100g", new BigDecimal("55.00"), new BigDecimal("0.18")));
			productRepository.save(new Product("P004", "Notebook 200pg", new BigDecimal("40.00"), new BigDecimal("0.12")));

			Customer customer = new Customer("C1001", "Ramesh Kumar");
			customer.getSpecialPricing().put("P002", new BigDecimal("165.00"));
			customerRepository.save(customer);

			System.out.println("Seeded 4 products and 1 customer.");
			System.out.println("=================================================");
			System.out.println("  AAMEC Billing System - Spring Boot backend");
			System.out.println("  Listening on http://localhost:" + port);
			System.out.println("=================================================");
		};
	}
}
