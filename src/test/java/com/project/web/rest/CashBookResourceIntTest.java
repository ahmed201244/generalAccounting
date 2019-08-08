package com.project.web.rest;

import com.project.GeneralAccountingApp;

import com.project.domain.CashBook;
import com.project.repository.CashBookRepository;
import com.project.service.CashBookService;
import com.project.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.project.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.domain.enumeration.TransactionType;
/**
 * Test class for the CashBookResource REST controller.
 *
 * @see CashBookResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeneralAccountingApp.class)
public class CashBookResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final TransactionType DEFAULT_TRANSACTION_TYPE = TransactionType.CREDIT;
    private static final TransactionType UPDATED_TRANSACTION_TYPE = TransactionType.DEBIT;

    private static final String DEFAULT_UUID = "AAAAAAAAAA";
    private static final String UPDATED_UUID = "BBBBBBBBBB";

    @Autowired
    private CashBookRepository cashBookRepository;

    @Autowired
    private CashBookService cashBookService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCashBookMockMvc;

    private CashBook cashBook;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CashBookResource cashBookResource = new CashBookResource(cashBookService);
        this.restCashBookMockMvc = MockMvcBuilders.standaloneSetup(cashBookResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CashBook createEntity(EntityManager em) {
        CashBook cashBook = new CashBook()
            .date(DEFAULT_DATE)
            .amount(DEFAULT_AMOUNT)
            .transactionType(DEFAULT_TRANSACTION_TYPE)
            .uuid(DEFAULT_UUID);
        return cashBook;
    }

    @Before
    public void initTest() {
        cashBook = createEntity(em);
    }

    @Test
    @Transactional
    public void createCashBook() throws Exception {
        int databaseSizeBeforeCreate = cashBookRepository.findAll().size();

        // Create the CashBook
        restCashBookMockMvc.perform(post("/api/cash-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBook)))
            .andExpect(status().isCreated());

        // Validate the CashBook in the database
        List<CashBook> cashBookList = cashBookRepository.findAll();
        assertThat(cashBookList).hasSize(databaseSizeBeforeCreate + 1);
        CashBook testCashBook = cashBookList.get(cashBookList.size() - 1);
        assertThat(testCashBook.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testCashBook.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testCashBook.getTransactionType()).isEqualTo(DEFAULT_TRANSACTION_TYPE);
        assertThat(testCashBook.getUuid()).isEqualTo(DEFAULT_UUID);
    }

    @Test
    @Transactional
    public void createCashBookWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cashBookRepository.findAll().size();

        // Create the CashBook with an existing ID
        cashBook.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCashBookMockMvc.perform(post("/api/cash-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBook)))
            .andExpect(status().isBadRequest());

        // Validate the CashBook in the database
        List<CashBook> cashBookList = cashBookRepository.findAll();
        assertThat(cashBookList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashBookRepository.findAll().size();
        // set the field null
        cashBook.setDate(null);

        // Create the CashBook, which fails.

        restCashBookMockMvc.perform(post("/api/cash-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBook)))
            .andExpect(status().isBadRequest());

        List<CashBook> cashBookList = cashBookRepository.findAll();
        assertThat(cashBookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = cashBookRepository.findAll().size();
        // set the field null
        cashBook.setAmount(null);

        // Create the CashBook, which fails.

        restCashBookMockMvc.perform(post("/api/cash-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBook)))
            .andExpect(status().isBadRequest());

        List<CashBook> cashBookList = cashBookRepository.findAll();
        assertThat(cashBookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCashBooks() throws Exception {
        // Initialize the database
        cashBookRepository.saveAndFlush(cashBook);

        // Get all the cashBookList
        restCashBookMockMvc.perform(get("/api/cash-books?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cashBook.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].transactionType").value(hasItem(DEFAULT_TRANSACTION_TYPE.toString())))
            .andExpect(jsonPath("$.[*].uuid").value(hasItem(DEFAULT_UUID.toString())));
    }
    
    @Test
    @Transactional
    public void getCashBook() throws Exception {
        // Initialize the database
        cashBookRepository.saveAndFlush(cashBook);

        // Get the cashBook
        restCashBookMockMvc.perform(get("/api/cash-books/{id}", cashBook.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cashBook.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.transactionType").value(DEFAULT_TRANSACTION_TYPE.toString()))
            .andExpect(jsonPath("$.uuid").value(DEFAULT_UUID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCashBook() throws Exception {
        // Get the cashBook
        restCashBookMockMvc.perform(get("/api/cash-books/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCashBook() throws Exception {
        // Initialize the database
        cashBookService.save(cashBook);

        int databaseSizeBeforeUpdate = cashBookRepository.findAll().size();

        // Update the cashBook
        CashBook updatedCashBook = cashBookRepository.findById(cashBook.getId()).get();
        // Disconnect from session so that the updates on updatedCashBook are not directly saved in db
        em.detach(updatedCashBook);
        updatedCashBook
            .date(UPDATED_DATE)
            .amount(UPDATED_AMOUNT)
            .transactionType(UPDATED_TRANSACTION_TYPE)
            .uuid(UPDATED_UUID);

        restCashBookMockMvc.perform(put("/api/cash-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCashBook)))
            .andExpect(status().isOk());

        // Validate the CashBook in the database
        List<CashBook> cashBookList = cashBookRepository.findAll();
        assertThat(cashBookList).hasSize(databaseSizeBeforeUpdate);
        CashBook testCashBook = cashBookList.get(cashBookList.size() - 1);
        assertThat(testCashBook.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testCashBook.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCashBook.getTransactionType()).isEqualTo(UPDATED_TRANSACTION_TYPE);
        assertThat(testCashBook.getUuid()).isEqualTo(UPDATED_UUID);
    }

    @Test
    @Transactional
    public void updateNonExistingCashBook() throws Exception {
        int databaseSizeBeforeUpdate = cashBookRepository.findAll().size();

        // Create the CashBook

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCashBookMockMvc.perform(put("/api/cash-books")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cashBook)))
            .andExpect(status().isBadRequest());

        // Validate the CashBook in the database
        List<CashBook> cashBookList = cashBookRepository.findAll();
        assertThat(cashBookList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCashBook() throws Exception {
        // Initialize the database
        cashBookService.save(cashBook);

        int databaseSizeBeforeDelete = cashBookRepository.findAll().size();

        // Delete the cashBook
        restCashBookMockMvc.perform(delete("/api/cash-books/{id}", cashBook.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CashBook> cashBookList = cashBookRepository.findAll();
        assertThat(cashBookList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CashBook.class);
        CashBook cashBook1 = new CashBook();
        cashBook1.setId(1L);
        CashBook cashBook2 = new CashBook();
        cashBook2.setId(cashBook1.getId());
        assertThat(cashBook1).isEqualTo(cashBook2);
        cashBook2.setId(2L);
        assertThat(cashBook1).isNotEqualTo(cashBook2);
        cashBook1.setId(null);
        assertThat(cashBook1).isNotEqualTo(cashBook2);
    }
}
