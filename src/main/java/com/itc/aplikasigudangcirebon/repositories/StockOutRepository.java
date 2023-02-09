package com.itc.aplikasigudangcirebon.repositories;

import com.itc.aplikasigudangcirebon.entities.StockIn;
import com.itc.aplikasigudangcirebon.entities.StockOut;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface StockOutRepository extends JpaRepository<StockOut, Long> {
    List<StockOut> findByDateEquals(LocalDate date);

    List<StockOut> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
