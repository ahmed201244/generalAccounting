package com.project.web.rest;

import com.project.GeneralAccountingApp;

import com.project.domain.TrialBalance;
import com.project.repository.TrialBalanceRepository;
import com.project.service.TrialBalanceService;
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
import java.util.List;


import static com.project.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrialBalanceResource REST controller.
 *
 * @see TrialBalanceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeneralAccountingApp.class)
public class TrialBalanceResourceIntTest {

    private static final BigDecimal DEFAULT_DEBIT = new BigDecimal(1);
    private static final BigDecimal UPDATED_DEBIT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_CREDIT = new BigDecimal(1);
    private static final BigDecimal UPDATED_CREDIT = new BigDecimal(2);

    @Autowired
    private TrialBalanceRepository trialBalanceRepository;

    @Autowired
    private TrialBalanceService trialBalanceService;

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

    private MockMvc restTrialBalanceMockMvc;

    private TrialBalance trialBalance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrialBalanceResource trialBalanceResource = new TrialBalanceResource(trialBalanceService);
        this.restTrialBalanceMockMvc = MockMvcBuilders.standaloneSetup(trialBalanceResource)
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
    public static TrialBalance createEntity(EntityManager em) {
        TrialBalance trialBalance = new TrialBalance()
            .debit(DEFAULT_DEBIT)
            .credit(DEFAULT_CREDIT);
        return trialBalance;
    }

    @Before
    public void initTest() {
        trialBalance = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrialBalance() throws Exception {
        int databaseSizeBeforeCreate = trialBalanceRepository.findAll().size();

        // Create the TrialBalance
        restTrialBalanceMockMvc.perform(post("/api/trial-balances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trialBalance)))
            .andExpect(status().isCreated());

        // Validate the TrialBalance in the database
        List<TrialBalance> trialBalanceList = trialBalanceRepository.findAll();
        assertThat(trialBalanceList).hasSize(databaseSizeBeforeCreate + 1);
        TrialBalance testTrialBalance = trialBalanceList.get(trialBalanceList.size() - 1);
        assertThat(testTrialBalance.getDebit()).isEqualTo(DEFAULT_DEBIT);
        assertThat(testTrialBalance.getCredit()).isEqualTo(DEFAULT_CREDIT);
    }

    @Test
    @Transactional
    public void createTrialBalanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trialBalanceRepository.findAll().size();

        // Create the TrialBalance with an existing ID
        trialBalance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrialBalanceMockMvc.perform(post("/api/trial-balances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trialBalance)))
            .andExpect(status().isBadRequest());

        // Validate the TrialBalance in the database
        List<TrialBalance> trialBalanceList = trialBalanceRepository.findAll();
        assertThat(trialBalanceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTrialBalances() throws Exception {
        // Initialize the database
        trialBalanceRepository.saveAndFlush(trialBalance);

        // Get all the trialBalanceList
        restTrialBalanceMockMvc.perform(get("/api/trial-balances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trialBalance.getId().intValue())))
            .andExpect(jsonPath("$.[*].debit").value(hasItem(DEFAULT_DEBIT.intValue())))
            .andExpect(jsonPath("$.[*].credit").value(hasItem(DEFAULT_CREDIT.intValue())));
    }
    
    @Test
    @Transactional
    public void getTrialBalance() throws Exception {
        // Initialize the database
        trialBalanceRepository.saveAndFlush(trialBalance);

        // Get the trialBalance
        restTrialBalanceMockMvc.perform(get("/api/trial-balances/{id}", trialBalance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trialBalance.getId().intValue()))
            .andExpect(jsonPath("$.debit").value(DEFAULT_DEBIT.intValue()))
            .andExpect(jsonPath("$.credit").value(DEFAULT_CREDIT.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingTrialBalance() throws Exception {
        // Get the trialBalance
        restTrialBalanceMockMvc.perform(get("/api/trial-balances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrialBalance() throws Exception {
        // Initialize the database
        trialBalanceService.save(trialBalance);

        int databaseSizeBeforeUpdate = trialBalanceRepository.findAll().size();

        // Update the trialBalance
        TrialBalance updatedTrialBalance = trialBalanceRepository.findById(trialBalance.getId()).get();
        // Disconnect from session so that the updates on updatedTrialBalance are not directly saved in db
        em.detach(updatedTrialBalance);
        updatedTrialBalance
            .debit(UPDATED_DEBIT)
            .credit(UPDATED_CREDIT);

        restTrialBalanceMockMvc.perform(put("/api/trial-balances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrialBalance)))
            .andExpect(status().isOk());

        // Validate the TrialBalance in the database
        List<TrialBalance> trialBalanceList = trialBalanceRepository.findAll();
        assertThat(trialBalanceList).hasSize(databaseSizeBeforeUpdate);
        TrialBalance testTrialBalance = trialBalanceList.get(trialBalanceList.size() - 1);
        assertThat(testTrialBalance.getDebit()).isEqualTo(UPDATED_DEBIT);
        assertThat(testTrialBalance.getCredit()).isEqualTo(UPDATED_CREDIT);
    }

    @Test
    @Transactional
    public void updateNonExistingTrialBalance() throws Exception {
        int databaseSizeBeforeUpdate = trialBalanceRepository.findAll().size();

        // Create the TrialBalance

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrialBalanceMockMvc.perform(put("/api/trial-balances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trialBalance)))
            .andExpect(status().isBadRequest());

        // Validate the TrialBalance in the database
        List<TrialBalance> trialBalanceList = trialBalanceRepository.findAll();
        assertThat(trialBalanceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrialBalance() throws Exception {
        // Initialize the database
        trialBalanceService.save(trialBalance);

        int databaseSizeBeforeDelete = trialBalanceRepository.findAll().size();

        // Delete the trialBalance
        restTrialBalanceMockMvc.perform(delete("/api/trial-balances/{id}", trialBalance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TrialBalance> trialBalanceList = trialBalanceRepository.findAll();
        assertThat(trialBalanceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TrialBalance.class);
        TrialBalance trialBalance1 = new TrialBalance();
        trialBalance1.setId(1L);
        TrialBalance trialBalance2 = new TrialBalance();
        trialBalance2.setId(trialBalance1.getId());
        assertThat(trialBalance1).isEqualTo(trialBalance2);
        trialBalance2.setId(2L);
        assertThat(trialBalance1).isNotEqualTo(trialBalance2);
        trialBalance1.setId(null);
        assertThat(trialBalance1).isNotEqualTo(trialBalance2);
    }
}
