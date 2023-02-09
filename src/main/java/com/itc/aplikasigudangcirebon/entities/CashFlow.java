package com.itc.aplikasigudangcirebon.entities;

import com.itc.aplikasigudangcirebon.enums.CashFlowType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.rest.core.annotation.RestResource;

import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

@Entity
@Table
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class CashFlow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String detail;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private CashFlowType type;

    @Column(nullable = false)
    private Double amount;

    @ManyToOne
    @RestResource(exported = false)
    @JoinColumn(name = "cash_account_id", nullable = false)
    private CashAccount cashAccount;

    @CreationTimestamp
    private Date dateCreated;

    @UpdateTimestamp
    private Date lastUpdated;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CashFlow cashFlow = (CashFlow) o;
        return id != null && Objects.equals(id, cashFlow.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}