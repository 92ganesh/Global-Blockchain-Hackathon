pragma solidity ^0.4.2;
pragma experimental ABIEncoderV2;

contract Survey{
    struct question {
        uint quesId;
        string quesvalue;
        mapping(uint => option)  options;
    }
    struct option{
        uint optId;
        string optvalue;
    }

    struct client{
        uint candId;
        string canName;
    }

    mapping(uint => question) public questions;
    mapping(address => client) public clients;

    uint public quesCount=0;
    uint public optCount=0;
    //string[] public optArray;

    //mapping(uint=>string) public optArray;

    function addQuestion(string memory qValue) public{
        optCount = 0;
        quesCount++;
        questions[quesCount].quesvalue = qValue;
        questions[quesCount].quesId = quesCount;
    }

    function addOption(string memory optionValue) public{
        optCount = optCount+1;
        questions[quesCount].options[optCount].optvalue = optionValue;
        questions[quesCount].options[optCount].optId = optCount;
    }

    function getOption(uint qId,uint oId) public returns(string[] memory optArray){
        //for(uint i = 1;i <= quesCount;i++){
        for(uint j = 1;j <= optCount;j++){
            optArray[j] = questions[qId].options[oId].optvalue;
        }
        return(optArray);    
        //}
        //return 
    }

}