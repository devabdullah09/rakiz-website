// Make Global Post, Get, Put and Delete requests using axios
import axios from "axios";
import PropTypes from "prop-types";

export const Post = (payload, action_url, onSucess, onError) => {
  axios
    .post(action_url, payload)
    .then((response) => {
      onSucess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// check prop types
Post.propTypes = {
  payload: PropTypes.object.isRequired,
  action_url: PropTypes.string.isRequired,
  onSucess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export const Get = (params, action_url, onSucess, onError) => {
  axios
    .get(action_url, params)
    .then((response) => {
      onSucess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// check prop types
Get.propTypes = {
  params: PropTypes.object.isRequired,
  action_url: PropTypes.string.isRequired,
  onSucess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export const Put = (payload, action_url, onSucess, onError) => {
  axios
    .put(action_url, payload)
    .then((response) => {
      onSucess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// check prop types
Put.propTypes = {
  payload: PropTypes.object.isRequired,
  action_url: PropTypes.string.isRequired,
  onSucess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export const Delete = (params, action_url, onSucess, onError) => {
  axios
    .delete(action_url, params)
    .then((response) => {
      onSucess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

// check prop types
Delete.propTypes = {
  params: PropTypes.object.isRequired,
  action_url: PropTypes.string.isRequired,
  onSucess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
