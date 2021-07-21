/**
 ** Slack message construction module
 ** Responsible for the creation of the Slack message
 **/

module.exports = function (message, jobStatus, actionText, actionUrl) {
  let actions = "";

  let slackMessage = {
    attachments: [
      {
        color: `${ statusColor(jobStatus) }`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `${message}`,
            },
          },
        ],
      },
    ],
  };
  if (actionText.length > 0 && actionUrl.length > 0) {
    actions = {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            emoji: true,
            text: `${actionText}`,
          },
          url: `${actionUrl}`,
        },
      ],
    };
    slackMessage.attachments[0].blocks.push(actions);
  }

  console.log(slackMessage.attachments[0]);
  return slackMessage;
};

function statusColor(status) {
  if (status.toLowerCase() === "success") return "#009944";
  if (status.toLowerCase() === "failure") return "#FF2000";
  if (status.toLowerCase() === "cancelled") return "#EDB95E";
}
