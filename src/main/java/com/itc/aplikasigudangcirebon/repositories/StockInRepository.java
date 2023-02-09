package com.itc.aplikasigudangcirebon.repositories;

import com.itc.aplikasigudangcirebon.entities.StockIn;
import com.itc.aplikasigudangcirebon.entities.StockOut;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface StockInRepository extends JpaRepository<StockIn, Long> {
    Page<StockIn> findByExpiredDateLessThan(LocalDate currentDate, Pageable pageable);

    List<StockIn> findByProductIdAndExpiredDateLessThan(Long id, LocalDate currentDate);

    @Query("select si.product.stockOuts from StockIn si where si.product.id = ?1")
    List<StockOut> findByProductId(Long id);

    List<StockIn> findByDateEquals(LocalDate date);

    List<StockIn> findByDateBetween(LocalDate startDate, LocalDate endDate);
}
