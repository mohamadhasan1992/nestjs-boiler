export const QUEUE_CONFIG = {
    SEND_EMAIL: {
        name: 'send-email',
        jobName: 'send-email-job',
    },

};

export const DEFAULT_JOB_OPTIONS = {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 30000,
    },
};

