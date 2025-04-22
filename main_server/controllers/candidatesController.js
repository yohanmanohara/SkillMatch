require('dotenv').config();
const AppliedJob = require('../models/appliedJobs');


const candidatehire = async (req, res) => {
  const { candidateId } = req.body;
  try {
  
    if (!candidateId) {
      return res.status(400).json({ 
        success: false,
        message: 'Candidate ID is required' 
      });
    }

    const updatedJob = await AppliedJob.findOneAndUpdate(
      { 
        _id: candidateId,
        status: { $ne: 'hired' } 
      },
      { 
        $set: { 
          status: 'hired',
          
         
        } 
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedJob) {
      const existingJob = await AppliedJob.findById(candidateId);
      if (!existingJob) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Candidate is already sorted'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Candidate successfully sorted',
      data: updatedJob    
    });

  } catch (error) {
    console.error('Error sorting candidate:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error while sorting candidate',
      error: error.message 
    });
  }


}


const sortCandidates = async (req, res) => {
  const { candidateId } = req.body;
  
  try {
  
    if (!candidateId) {
      return res.status(400).json({ 
        success: false,
        message: 'Candidate ID is required' 
      });
    }

    const updatedJob = await AppliedJob.findOneAndUpdate(
      { 
        _id: candidateId,
        status: { $ne: 'sorted' } 
      },
      { 
        $set: { 
          status: 'sorted',
          
         
        } 
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedJob) {
      const existingJob = await AppliedJob.findById(candidateId);
      if (!existingJob) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Candidate is already sorted'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Candidate successfully sorted',
      data: updatedJob    
    });

  } catch (error) {
    console.error('Error sorting candidate:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error while sorting candidate',
      error: error.message 
    });
  }
};


const rejectCandidates = async (req, res) => {
  const { candidateId } = req.body;
  
  try {
    if (!candidateId) {
      return res.status(400).json({ 
        success: false,
        message: 'Candidate ID is required' 
      });
    }

    const updatedJob = await AppliedJob.findOneAndUpdate(
      { 
        _id: candidateId,
        status: { $ne: 'rejected' } 
      },
      { 
        $set: { 
          status: 'rejected',
        
         
        } 
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedJob) {
      const existingJob = await AppliedJob.findById(candidateId);
      if (!existingJob) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Candidate is already rejected'
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Candidate successfully rejected',
      data: updatedJob    
    });
  }
  catch (error) {
    console.error('Error rejecting candidate:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error while rejecting candidate',
      error: error.message 
    });
  }
}

const unsortcandidates = async (req, res) => {
  const { candidateId } = req.body;
  
  try {
    if (!candidateId) {
      return res.status(400).json({ 
        success: false,
        message: 'Candidate ID is required' 
      });
    }

    const updatedJob = await AppliedJob.findOneAndUpdate(
      { 
        _id: candidateId,
        status: { $ne: 'unsorted' } 
      },
      { 
        $set: { 
          status: 'unsorted',
          
         
        } 
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedJob) {
      const existingJob = await AppliedJob.findById(candidateId);
      if (!existingJob) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Candidate is already unsorted'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Candidate successfully unsorted',
      data: updatedJob    
    });

  } catch (error) {
    console.error('Error unsorting candidate:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error while unsorting candidate',
      error: error.message 
    });
  }
}

const processcandidates = async (req, res) => {
  const { candidateId } = req.body;
  
  try {
    if (!candidateId) {
      return res.status(400).json({ 
        success: false,
        message: 'Candidate ID is required' 
      });
    }

    const updatedJob = await AppliedJob.findOneAndUpdate(
      { 
        _id: candidateId,
        status: { $ne: 'processed' } 
      },
      { 
        $set: { 
          status: 'processed',
          
         
        } 
      },
      { 
        new: true,
        runValidators: true 
      }
    );

    if (!updatedJob) {
      const existingJob = await AppliedJob.findById(candidateId);
      if (!existingJob) {
        return res.status(404).json({
          success: false,
          message: 'Candidate not found'
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Candidate is already processed'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Candidate successfully processed',
      data: updatedJob    
    });

  } catch (error) {
    console.error('Error processing candidate:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error while processing candidate',
      error: error.message 
    });
  }
};

module.exports = { sortCandidates, rejectCandidates, unsortcandidates ,processcandidates,candidatehire};    