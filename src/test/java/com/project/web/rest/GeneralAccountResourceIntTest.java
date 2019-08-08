package com.project.web.rest;

import com.project.GeneralAccountingApp;

import com.project.domain.GeneralAccount;
import com.project.repository.GeneralAccountRepository;
import com.project.service.GeneralAccountService;
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
import java.util.List;


import static com.project.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.project.domain.enumeration.AccountType;
/**
 * Test class for the GeneralAccountResource REST controller.
 *
 * @see GeneralAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeneralAccountingApp.class)
public class GeneralAccountResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final AccountType DEFAULT_TYPE = AccountType.ASSET;
    private static final AccountType UPDATED_TYPE = AccountType.LIABILITY;

    @Autowired
    private GeneralAccountRepository generalAccountRepository;

    @Autowired
    private GeneralAccountService generalAccountService;

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

    private MockMvc restGeneralAccountMockMvc;

    private GeneralAccount generalAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GeneralAccountResource generalAccountResource = new GeneralAccountResource(generalAccountService);
        this.restGeneralAccountMockMvc = MockMvcBuilders.standaloneSetup(generalAccountResource)
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
    public static GeneralAccount createEntity(EntityManager em) {
        GeneralAccount generalAccount = new GeneralAccount()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .type(DEFAULT_TYPE);
        return generalAccount;
    }

    @Before
    public void initTest() {
        generalAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createGeneralAccount() throws Exception {
        int databaseSizeBeforeCreate = generalAccountRepository.findAll().size();

        // Create the GeneralAccount
        restGeneralAccountMockMvc.perform(post("/api/general-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalAccount)))
            .andExpect(status().isCreated());

        // Validate the GeneralAccount in the database
        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeCreate + 1);
        GeneralAccount testGeneralAccount = generalAccountList.get(generalAccountList.size() - 1);
        assertThat(testGeneralAccount.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testGeneralAccount.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testGeneralAccount.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createGeneralAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = generalAccountRepository.findAll().size();

        // Create the GeneralAccount with an existing ID
        generalAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGeneralAccountMockMvc.perform(post("/api/general-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalAccount)))
            .andExpect(status().isBadRequest());

        // Validate the GeneralAccount in the database
        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = generalAccountRepository.findAll().size();
        // set the field null
        generalAccount.setCode(null);

        // Create the GeneralAccount, which fails.

        restGeneralAccountMockMvc.perform(post("/api/general-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalAccount)))
            .andExpect(status().isBadRequest());

        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescriptionIsRequired() throws Exception {
        int databaseSizeBeforeTest = generalAccountRepository.findAll().size();
        // set the field null
        generalAccount.setDescription(null);

        // Create the GeneralAccount, which fails.

        restGeneralAccountMockMvc.perform(post("/api/general-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalAccount)))
            .andExpect(status().isBadRequest());

        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = generalAccountRepository.findAll().size();
        // set the field null
        generalAccount.setType(null);

        // Create the GeneralAccount, which fails.

        restGeneralAccountMockMvc.perform(post("/api/general-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalAccount)))
            .andExpect(status().isBadRequest());

        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGeneralAccounts() throws Exception {
        // Initialize the database
        generalAccountRepository.saveAndFlush(generalAccount);

        // Get all the generalAccountList
        restGeneralAccountMockMvc.perform(get("/api/general-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(generalAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getGeneralAccount() throws Exception {
        // Initialize the database
        generalAccountRepository.saveAndFlush(generalAccount);

        // Get the generalAccount
        restGeneralAccountMockMvc.perform(get("/api/general-accounts/{id}", generalAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(generalAccount.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGeneralAccount() throws Exception {
        // Get the generalAccount
        restGeneralAccountMockMvc.perform(get("/api/general-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGeneralAccount() throws Exception {
        // Initialize the database
        generalAccountService.save(generalAccount);

        int databaseSizeBeforeUpdate = generalAccountRepository.findAll().size();

        // Update the generalAccount
        GeneralAccount updatedGeneralAccount = generalAccountRepository.findById(generalAccount.getId()).get();
        // Disconnect from session so that the updates on updatedGeneralAccount are not directly saved in db
        em.detach(updatedGeneralAccount);
        updatedGeneralAccount
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .type(UPDATED_TYPE);

        restGeneralAccountMockMvc.perform(put("/api/general-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGeneralAccount)))
            .andExpect(status().isOk());

        // Validate the GeneralAccount in the database
        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeUpdate);
        GeneralAccount testGeneralAccount = generalAccountList.get(generalAccountList.size() - 1);
        assertThat(testGeneralAccount.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testGeneralAccount.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testGeneralAccount.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingGeneralAccount() throws Exception {
        int databaseSizeBeforeUpdate = generalAccountRepository.findAll().size();

        // Create the GeneralAccount

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGeneralAccountMockMvc.perform(put("/api/general-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(generalAccount)))
            .andExpect(status().isBadRequest());

        // Validate the GeneralAccount in the database
        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGeneralAccount() throws Exception {
        // Initialize the database
        generalAccountService.save(generalAccount);

        int databaseSizeBeforeDelete = generalAccountRepository.findAll().size();

        // Delete the generalAccount
        restGeneralAccountMockMvc.perform(delete("/api/general-accounts/{id}", generalAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GeneralAccount> generalAccountList = generalAccountRepository.findAll();
        assertThat(generalAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GeneralAccount.class);
        GeneralAccount generalAccount1 = new GeneralAccount();
        generalAccount1.setId(1L);
        GeneralAccount generalAccount2 = new GeneralAccount();
        generalAccount2.setId(generalAccount1.getId());
        assertThat(generalAccount1).isEqualTo(generalAccount2);
        generalAccount2.setId(2L);
        assertThat(generalAccount1).isNotEqualTo(generalAccount2);
        generalAccount1.setId(null);
        assertThat(generalAccount1).isNotEqualTo(generalAccount2);
    }
}
