package com.itc.aplikasigudangcirebon.entities;

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
public class StockOut {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String trx;

    @ManyToOne
    @RestResource(exported = false)
    @JoinColumn(name = "stall_id", nullable = false)
    private Stall stall;

    @ManyToOne
    @RestResource(exported = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Double unitPurchasePrice;

    private Double warehouseQuantity;

    private Double storeQuantity;

    @Column(nullable = false)
    private Double totalSellingPrice;

    @Column(nullable = false)
    private Double moneyPaid;

    @CreationTimestamp
    private Date dateCreated;

    @UpdateTimestamp
    private Date lastUpdated;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        StockOut stockIn = (StockOut) o;
        return id != null && Objects.equals(id, stockIn.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
