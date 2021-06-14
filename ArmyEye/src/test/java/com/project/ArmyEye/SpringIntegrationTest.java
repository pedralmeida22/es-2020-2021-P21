package com.project.ArmyEye;

import com.project.ArmyEye.Models.GPS;
import com.project.ArmyEye.Models.Helmet;
import com.project.ArmyEye.Models.VitalJacket_ECG;
import com.project.ArmyEye.repository.ECGRepository;
import com.project.ArmyEye.repository.GPSRepository;
import com.project.ArmyEye.repository.HelmetRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import java.util.List;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SpringIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GPSRepository gpsRepository;
    @Autowired
    private ECGRepository ecgRepository;
    @Autowired
    private HelmetRepository helmetRepository;


    @Test
    void existValueECGinBD() throws Exception {

        List<VitalJacket_ECG> ecg_repo = (List) ecgRepository.findAll();
        assert((ecg_repo.get(0).getECG()).equals("125.0"));
    }

    @Test
    void existValueGPSinBD() throws Exception {

        List<GPS> ecg_repo = (List) gpsRepository.findAll();
        assert((ecg_repo.get(0).getAltitude()).equals("0.0"));
    }

    @Test
    void existValueHelmetinBD() throws Exception {

        List<Helmet> ecg_repo = (List) helmetRepository.findAll();
        assert((ecg_repo.get(0).getCO()).equals("0.0"));
    }

    @Test
    void existValueHelmet2inBD() throws Exception {

        List<Helmet> ecg_repo = (List) helmetRepository.findAll();
        assert((ecg_repo.get(0).getBattery()).equals("93.0"));
    }

    @Test
    void existValueHelmet3inBD() throws Exception {

        List<Helmet> ecg_repo = (List) helmetRepository.findAll();
        assert((ecg_repo.get(0).getNO2()).equals("-1.0"));
    }

    @Test
    void existValueHelmet4inBD() throws Exception {

        List<Helmet> ecg_repo = (List) helmetRepository.findAll();
        assert((ecg_repo.get(0).getLuminosity()).equals("100.0"));
    }

    @Test
    void existValueHelmet5inBD() throws Exception {

        List<Helmet> ecg_repo = (List) helmetRepository.findAll();
        assert((ecg_repo.get(0).getHumidity()).equals("44.0"));
    }

}