import axios from "axios";
import { spaceId, accessToken } from "./contentfulConfig.js";

export const fetchHeroSection = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=heroSection`
        );
        console.log("Hero Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return [];
    }
};

export const fetchClients = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=clientsPartners`
        );
        console.log("Client Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchFeatures = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=featureSection`
        );
        console.log("Feature Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchFeatureCards = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=featureCard`
        );
        console.log("Feature Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchAboutSection = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=aboutSection`
        );
        console.log("About Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchServiceSection = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=serviceSection`
        );
        console.log("Service Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchNumbers = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=numbers`
        );
        console.log("Number Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchCaseStudy = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=caseStudy`
        );
        console.log("Number Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchTestimonials = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=testimonials`
        );
        console.log("Number Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchBlogSection = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=blogSection`
        );
        console.log("Number Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
export const fetchBlogs = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=blogCards`
        );
        console.log("Number Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export const fetchFooter = async () => {
    try {
        const response = await axios.get(
            `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}&content_type=footer`
        );
        console.log("Number Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};
