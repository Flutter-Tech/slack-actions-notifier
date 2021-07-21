"use strict";

const core = require("@actions/core");
const slackMessage = require("./slackMessage");
const slackWebhook = require("@slack/webhook");
(async () => {
  try {
    const jobStatus = core.getInput("job_status");
    const actionUrl = core.getInput("action_url");
    const actionText = core.getInput("action_text");
    const message = core.getInput("slack_message");
    const webhookUrl =
      core.getInput("slack_webhook");
    const webhook = new slackWebhook.IncomingWebhook(webhookUrl);

    const result = await webhook.send(
      slackMessage(message, jobStatus, actionText, actionUrl)
    );

    core.info(JSON.stringify(result));
  } catch (error) {
    console.log(error);
    core.setFailed(error);
    core.error(error.stack);
  }
})();
