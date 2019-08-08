package com.project.web.rest;

import com.project.GeneralAccountingApp;

import com.project.domain.GeneralLedger;
import com.project.repository.GeneralLedgerRepository;
import com.project.service.GeneralLedgerService;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.project.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GeneralLedgerResource REST controller.
 *
 * @see GeneralLedgerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeneralAccountingApp.class)
public class GeneralLedgerResourceIntTest {

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final BigDecimal DEFAULT_TRANSACTIONS_SUM_DR = new BigDecimal(1);
    private static final BigDecimal UPDATED_TRANSACTIONS_SUM_DR = new BigDecimal(2);

    private static final BigDecimal DEFAULT_TRANSACTIONS_SUM_CR = new BigDecimal(1);
    private static final BigDecimal UPDATED_TRANSACTIONS_SUM_CR = new BigDecimal(2);

    private static final BigDecimal DEFAULT_BALANCE_SUM_DR = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE_SUM_DR = new BigDecimal(2);

    private static final BigDecimal DEFAULT_BALANCE_SUM_CR = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE_SUM_CR = new BigDecimal(2);

    @Autowired
    private GeneralLedgerRepository generalLedgerRepository;

    @Autowired
    private GeneralLedgerService generalLedgerService;

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

    private MockMvc restGeneralLedgerMockMvc;

    private GeneralLedger generalLedger;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GeneralLedgerResource generalLedgerResource = new GeneralLedgerResource(generalLedgerService);
        this.restGeneralLedgerMockMvc = MockMvcBuilders.standaloneSetup(generalLedgerResource)
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
    public static GeneralLedger createEntity(EntityManager em) {
        GeneralLedger generalLedger = new GeneralLedger()
            .date(DEFAULT_DATE)
            .transactionsSumDr(DEFAULT_TRANSACTIONS_SUM_DR)
            .transactionsSumCr(DEFAULT_TRANSACTIONS_SUM_CR)
            .balanceSumDr(DEFAULT_BALANCE_SUM_DR)
            .balanceSumCr(DEFAULT_BALANCE_SUM_CR);
        return generalLedger;
    }

    @Before
    public void initTest() {
        generalLedger = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeneralLedger() throws Exception {
        int databaseSizeBeforeCreate = generalLedgerRepository.findAll().size();

        // Create the GeneralLedger
        restGeneralLedgerMockMvc.perform(post("/api/general-ledgers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalLedger)))
            .andExpect(status().isCreated());

        // Validate the GeneralLedger in the database
        List<GeneralLedger> generalLedgerList = generalLedgerRepository.findAll();
        assertThat(generalLedgerList).hasSize(databaseSizeBeforeCreate + 1);
        GeneralLedger testGeneralLedger = generalLedgerList.get(generalLedgerList.size() - 1);
        assertThat(testGeneralLedger.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testGeneralLedger.getTransactionsSumDr()).isEqualTo(DEFAULT_TRANSACTIONS_SUM_DR);
        assertThat(testGeneralLedger.getTransactionsSumCr()).isEqualTo(DEFAULT_TRANSACTIONS_SUM_CR);
        assertThat(testGeneralLedger.getBalanceSumDr()).isEqualTo(DEFAULT_BALANCE_SUM_DR);
        assertThat(testGeneralLedger.getBalanceSumCr()).isEqualTo(DEFAULT_BALANCE_SUM_CR);
    }

    @Test
    @Transactional
    public void createGeneralLedgerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = generalLedgerRepository.findAll().size();

        // Create the GeneralLedger with an existing ID
        generalLedger.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeneralLedgerMockMvc.perform(post("/api/general-ledgers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalLedger)))
            .andExpect(status().isBadRequest());

        // Validate the GeneralLedger in the database
        List<GeneralLedger> generalLedgerList = generalLedgerRepository.findAll();
        assertThat(generalLedgerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGeneralLedgers() throws Exception {
        // Initialize the database
        generalLedgerRepository.saveAndFlush(generalLedger);

        // Get all the generalLedgerList
        restGeneralLedgerMockMvc.perform(get("/api/general-ledgers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(generalLedger.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].transactionsSumDr").value(hasItem(DEFAULT_TRANSACTIONS_SUM_DR.intValue())))
            .andExpect(jsonPath("$.[*].transactionsSumCr").value(hasItem(DEFAULT_TRANSACTIONS_SUM_CR.intValue())))
            .andExpect(jsonPath("$.[*].balanceSumDr").value(hasItem(DEFAULT_BALANCE_SUM_DR.intValue())))
            .andExpect(jsonPath("$.[*].balanceSumCr").value(hasItem(DEFAULT_BALANCE_SUM_CR.intValue())));
    }
    
    @Test
    @Transactional
    public void getGeneralLedger() throws Exception {
        // Initialize the database
        generalLedgerRepository.saveAndFlush(generalLedger);

        // Get the generalLedger
        restGeneralLedgerMockMvc.perform(get("/api/general-ledgers/{id}", generalLedger.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(generalLedger.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.transactionsSumDr").value(DEFAULT_TRANSACTIONS_SUM_DR.intValue()))
            .andExpect(jsonPath("$.transactionsSumCr").value(DEFAULT_TRANSACTIONS_SUM_CR.intValue()))
            .andExpect(jsonPath("$.balanceSumDr").value(DEFAULT_BALANCE_SUM_DR.intValue()))
            .andExpect(jsonPath("$.balanceSumCr").value(DEFAULT_BALANCE_SUM_CR.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingGeneralLedger() throws Exception {
        // Get the generalLedger
        restGeneralLedgerMockMvc.perform(get("/api/general-ledgers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeneralLedger() throws Exception {
        // Initialize the database
        generalLedgerService.save(generalLedger);

        int databaseSizeBeforeUpdate = generalLedgerRepository.findAll().size();

        // Update the generalLedger
        GeneralLedger updatedGeneralLedger = generalLedgerRepository.findById(generalLedger.getId()).get();
        // Disconnect from session so that the updates on updatedGeneralLedger are not directly saved in db
        em.detach(updatedGeneralLedger);
        updatedGeneralLedger
            .date(UPDATED_DATE)
            .transactionsSumDr(UPDATED_TRANSACTIONS_SUM_DR)
            .transactionsSumCr(UPDATED_TRANSACTIONS_SUM_CR)
            .balanceSumDr(UPDATED_BALANCE_SUM_DR)
            .balanceSumCr(UPDATED_BALANCE_SUM_CR);

        restGeneralLedgerMockMvc.perform(put("/api/general-ledgers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeneralLedger)))
            .andExpect(status().isOk());

        // Validate the GeneralLedger in the database
        List<GeneralLedger> generalLedgerList = generalLedgerRepository.findAll();
        assertThat(generalLedgerList).hasSize(databaseSizeBeforeUpdate);
        GeneralLedger testGeneralLedger = generalLedgerList.get(generalLedgerList.size() - 1);
        assertThat(testGeneralLedger.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testGeneralLedger.getTransactionsSumDr()).isEqualTo(UPDATED_TRANSACTIONS_SUM_DR);
        assertThat(testGeneralLedger.getTransactionsSumCr()).isEqualTo(UPDATED_TRANSACTIONS_SUM_CR);
        assertThat(testGeneralLedger.getBalanceSumDr()).isEqualTo(UPDATED_BALANCE_SUM_DR);
        assertThat(testGeneralLedger.getBalanceSumCr()).isEqualTo(UPDATED_BALANCE_SUM_CR);
    }

    @Test
    @Transactional
    public void updateNonExistingGeneralLedger() throws Exception {
        int databaseSizeBeforeUpdate = generalLedgerRepository.findAll().size();

        // Create the GeneralLedger

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeneralLedgerMockMvc.perform(put("/api/general-ledgers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalLedger)))
            .andExpect(status().isBadRequest());

        // Validate the GeneralLedger in the database
        List<GeneralLedger> generalLedgerList = generalLedgerRepository.findAll();
        assertThat(generalLedgerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeneralLedger() throws Exception {
        // Initialize the database
        generalLedgerService.save(generalLedger);

        int databaseSizeBeforeDelete = generalLedgerRepository.findAll().size();

        // Delete the generalLedger
        restGeneralLedgerMockMvc.perform(delete("/api/general-ledgers/{id}", generalLedger.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GeneralLedger> generalLedgerList = generalLedgerRepository.findAll();
        assertThat(generalLedgerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeneralLedger.class);
        GeneralLedger generalLedger1 = new GeneralLedger();
        generalLedger1.setId(1L);
        GeneralLedger generalLedger2 = new GeneralLedger();
        generalLedger2.setId(generalLedger1.getId());
        assertThat(generalLedger1).isEqualTo(generalLedger2);
        generalLedger2.setId(2L);
        assertThat(generalLedger1).isNotEqualTo(generalLedger2);
        generalLedger1.setId(null);
        assertThat(generalLedger1).isNotEqualTo(generalLedger2);
    }
}
