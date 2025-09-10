import candidateModel from "../models/candidateModels.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create candidate token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// login candidate
const loginCandidate = async (req, res) => {
    const {email, password} = req.body;

    try {
        // check for existing candidate
        const candidate = await candidateModel.findOne({email});
        if(!candidate) {
            return res.json({success: false, message: "Error! Candidate doesn't exist"});
        }
        
        // check for matching password
        const isMatch = await bcrypt.compare(password, candidate.password);
        if(!isMatch) {
            return res.json({success: false, message: "Error! Invalid Credentials"});
        }

        // create token for saved candidate to pass in response
        const token = createToken(candidate._id);
        res.json({success: true, token});
    } catch (error) {
        res.json({success: false, message: "Error! Something went wrong"});
    }
}

// register candidate
const registerCandidate = async (req, res) => {
    const {name, email, password} = req.body

    try {
        // check for similar existing emails
        const exists = await candidateModel.findOne({email});
        if(exists) {
            return res.json({success: false, message: "Candidate with same email already exists!"});
        }

        // validate candidate email and password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email id!"});
        }

        if(password.length < 8) {
            return res.json({success: false, message: "Password must have a minimum length of 8!"});
        }

        // hashing candidate password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const New_Candidate = new candidateModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        // save candidate data in DB
        const candidate = await New_Candidate.save();

        // create token for saved candidate to pass in response
        const token = createToken(candidate._id);        
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error! Something went wrong"});
    }
}

// list all candidates
const listCandidate = async (req, res) => {
    try {
        const candidates = await candidateModel.find({});
        res.json({success: true, data: candidates});
    } catch (error) {
        res.json({success: false, message: "Error! Something went wrong"});
    }
}

export { loginCandidate, registerCandidate, listCandidate };