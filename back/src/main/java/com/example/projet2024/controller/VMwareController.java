package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.fortinet.Fortinet;
import com.example.projet2024.entite.vmware.VMware;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.VMwareServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/VMware")
@CrossOrigin(origins = "http://localhost:4200")
public class VMwareController {

    @Autowired
    private VMwareServiceImpl vmwareService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addVMware")
    public VMware addVMware(@RequestBody VMware vmware) {
        return vmwareService.addVMware(vmware);
    }

    @PutMapping("/updateVMware")
    public VMware updateVMware(@RequestBody VMware vmware) {
        return vmwareService.updateVMware(vmware);
    }

    @GetMapping("/get/{id-VMware}")
    public VMware getById(@PathVariable("id-VMware") Long vmwareId) {
        return vmwareService.retrieveVMware(vmwareId);
    }

    @GetMapping("/allVMware")
    public List<VMware> getAllVMwares() {
        return vmwareService.retrieveAllVMwares();
    }

    @DeleteMapping("/delete/{VMware-id}")
    public void deleteById(@PathVariable("VMware-id") Long vmwareId) {
        vmwareService.deleteById(vmwareId);
    }

    @PutMapping("/approuve/{id}")
    public void activateVMware(@PathVariable("id") Long id) {
        vmwareService.activate(id);
    }
}
