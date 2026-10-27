const { where } = require( 'sequelize' );
const { Student } = require( '../models' );

const createStudent = async ( req, res ) => {
    try {
        const { firstName, lastName, email, dateOfBirth, gender, matricNumber, department, level, status } = req.body;

        if ( !firstName || !lastName || !dateOfBirth || !gender || !matricNumber || !department || !level || !email ) {
            return res.status( 400 ).json( {
                message: 'All fields are required except status'
            } );
        }

        const studentByEmail = await Student.findOne( { where: { email: email.toLowerCase() } } );

        if ( studentByEmail ) {
            return res.status( 409 ).json( {
                message: `Student with email: ${ email } already exist`
            } );
        }

        const studentByMatricNumber = await Student.findOne( { where: { matricNumber } } );

        if ( studentByMatricNumber ) {
            return res.status( 409 ).json( {
                message: `Student with matric Number: ${ matricNumber } already exist`
            } );
        }

        const newStudent = await Student.create( {
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            matricNumber,
            department,
            level,
            status
        } );

        res.status( 201 ).json( { message: 'Student created successfully', data: newStudent } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const getAllStudents = async ( req, res ) => {
    try {
        const students = await Student.findAll();

        res.status( 200 ).json( {
            message: `All Students and the total is: ${ students.length }`,
            data: students
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};


const getStudentById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk( id );

        if ( !student ) {
            return res.status( 404 ).json( {
                message: 'Student not found'
            } );
        }

        res.status( 200 ).json( {
            message: 'Student found',
            data: student
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        } );
    }
};

const updateStudent = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, dateOfBirth, gender, matricNumber, department, level, status } = req.body;

        const student = await Student.findByPk( id );
        if ( !student ) {
            return res.status( 404 ).json( {
                message: 'Student not found'
            } );
        }

        if ( email && email !== student.email ) {
            const studentEmail = await Student.findOne( { where: { email } } );

            if ( studentEmail ) {
                return res.status( 409 ).json( {
                    message: `Email: ${ email } is already linked to ${ studentEmail.firstName } ${ studentEmail.lastName }`
                } );
            }

        }

        if ( matricNumber && matricNumber !== student.matricNumber ) {
            const studentMatricNumber = await Student.findOne( { where: { matricNumber } } );

            if ( studentMatricNumber ) {
                return res.status( 409 ).json( {
                    message: `Matric Number: ${ matricNumber } is already linked to ${ studentMatricNumber.firstName } ${ studentMatricNumber.lastName }`
                } );
            }

        }

        const updatedStudent = await student.update( { firstName, lastName, email, gender, status, dateOfBirth, department, level, matricNumber } );

        res.status( 200 ).json( {
            message: 'Student Updated Successfully',
            data: updatedStudent
        } );

    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Something is wrong with the server'
        } );
    }
};

const deleteStudent = async ( req, res ) => {
    try {
        const { id } = req.params;

        const student = await Student.findByPk(id);

        if ( !student ) {
            return res.status( 404 ).json( {
                message: 'Student not found'
            } );
        }

        await student.destroy();
        res.status( 200 ).json( {
            message: 'student deleted successfully'
        } );
    } catch ( error ) {
        res.status( 500 ).json( {
            message: 'Something is wrong with the server'
        } );
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};