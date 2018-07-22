/* jshint ignore:start */
const util = require('util');
const Youtube = require("youtube-api")

const gapi = require("./lib/gapi");
exports.prepareDownload = async function({videos, socket, tokens}) {
  let error = 0,
    success = 0;
  let data;
  console.log("UPLAODING " + videos.length + " VIDOES");
  for (let currentVideo of videos) {
    try {

      gapi.oauth.setCredentials(tokens);
      console.log("Download Started" + currentVideo.title)
      data = await download(currentVideo.url)
      console.log("Download Completed and Uploading " + currentVideo.title)
      const uploadParams = {
        resource: {
          // Video title and description
          snippet: {
            title: currentVideo.title,
            description: currentVideo.description || ""
          },

          status: {
            privacyStatus: currentVideo.privacyStatus || "private"
          }
        },
        part: "snippet,status",
        media: {
          body: data
        }
      }
      const insertVideo = util.promisify(Youtube.videos.insert);
      const uploadedData = await insertVideo(uploadParams);
      console.log("Uploaded: " + currentVideo.title)
      socket.emit("done", currentVideo);
      success++;
    } catch (err) {
      error++;
      console.error("utils.prepareDownload(1)", err);
    }
    data = null;
  }

  return {
    error,
    success
  };
}