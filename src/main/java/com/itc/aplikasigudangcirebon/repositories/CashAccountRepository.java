package com.itc.aplikasigudangcirebon.repositories;

import com.itc.aplikasigudangcirebon.entities.CashAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin("http://localhost:4200")
public interface CashAccountRepository extends JpaRepository<CashAccount, Long> {
}
