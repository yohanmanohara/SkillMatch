import React from 'react';

const JobCards = () => {
  const jobData = [
    {
      title: 'Cloud Solutions Architect',
      company: 'Company Name',
      salary: '$200,000/yr',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit dolor, molestie id rutrum a, sodales ut magna. Vestibulum scelerisque at risus non volutpat. Etiam elit est, placerat id tincidunt a, maximus id sem. Duis ultricies et augue consequat lacinia. Nulla sed tincidunt tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed elit dolor, molestie id rutrum a, sodales ut magna. Vestibulum scelerisque at risus non volutpat. Etiam elit est, placerat id tincidunt a, maximus id sem. Duis ultricies et augue consequat lacinia. Nulla sed tincidunt tellus.`,
      tags: ['On Site', 'Full Time'],
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
    },
  ];

  return (
<>
      {jobData.map((job, index) => (
        <div
          key={index}
          className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6"
          style={{ width: '100%', height: 'auto' }}
        >
          <div className="flex flex-col lg:w-1/4 items-center">
            <div className="bg-blue-500 rounded-full p-3">
              <img
                src={job.logo}
                alt="Company Logo"
                className="h-12 w-12"
              />
            </div>

            <div className="text-center mt-4">
              <h3 className="text-xl font-bold text-black">{job.title}</h3>
              <p className="text-black">{job.company}</p>
              <p className="text-gray-500">{job.salary}</p>
            </div>

            <div className="mt-6 flex space-x-4 justify-center">
              <button className="py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800">
                Apply Now
              </button>
              <button className="flex items-center text-gray-600">
                <span className="material-icons-outlined">share</span>
              </button>
            </div>
          </div>

          <div className="lg:w-3/4 flex flex-col justify-between items-center text-center">
            <p className="text-gray-700 mb-4">
              {job.description}
            </p>

            <div className="flex space-x-2 justify-center mt-4">
              {job.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="text-sm font-semibold bg-green-200 text-green-800 py-1 px-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
              <span className="text-sm font-semibold bg-red-200 text-red-800 py-1 px-2 rounded-full">
                Save Here
              </span>
            </div>
          </div>
        </div>
      ))}
      </>

  );
};

export default JobCards;
