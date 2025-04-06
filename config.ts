const ENV = {
    dev: {
        API: "http://192.168.1.181:8000/",
    },
    prod: {
        API: "http://fleet-master-back-env.eba-gvt2xidk.us-east-2.elasticbeanstalk.com/"
    }
};

const getEnvVars = (env = process.env.NODE_ENV || "development") => {
    if (env === "development") {
        return ENV.dev;
    } else if (env === "production") {
        return ENV.prod;
    }
}

export default getEnvVars;