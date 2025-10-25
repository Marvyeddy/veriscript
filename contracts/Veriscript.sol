// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VeriScript {
    struct Prescription {
        uint256 id;
        address doctor;
        string patientId;
        string drugDetails;
        uint256 timestamp;
        bool isValid;
    }

    mapping(uint256 => Prescription) public prescriptions;
    mapping(address => bool) public verifiedDoctors;
    uint256 public counter = 0;

    event DoctorVerified(address indexed doctor);
    event PrescriptionCreated(uint256 indexed id, address indexed doctor);

    modifier onlyDoctor() {
        require(verifiedDoctors[msg.sender], "Not an authorized doctor");
        _;
    }

    function verifyDoctor(address _doctor) public {
        verifiedDoctors[_doctor] = true;
        emit DoctorVerified(_doctor);
    }

    function createPrescription(string memory _patientId, string memory _drugDetails)
        public
        onlyDoctor
        returns (uint256)
    {
        counter++;
        prescriptions[counter] = Prescription(counter, msg.sender, _patientId, _drugDetails, block.timestamp, true);
        emit PrescriptionCreated(counter, msg.sender);
        return counter;
    }

    function verifyPrescription(uint256 _id) public view returns (Prescription memory) {
        return prescriptions[_id];
    }
}
