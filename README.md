# Slack Actions Notifier

This actions sends a Slack message with the result of a GitHub Actions workflow run, using a Slack Webhook.

## Usage

```yaml
name: Send GitHub Enterprise Usage data to Slack

on:
  workflow_dispatch:

jobs:
  send-slack-message:
    runs-on: ubuntu-latest
    steps:
      - name: Run action
        uses: Flutter-Tech/slack-actions-notifier@v1
      - name: Send Slack message to channel if job fails
        if: ${{ failure() }}
        env:
          # MANDATORY
          SLACK_MESSAGE: "Something happened in a GitHub Actions workflow"
          SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
          ACTION_STATUS: ${{ job.status }}
          # OPTIONAL
          ACTION_TEXT: Open workflow run
          ACTION_URL: ${{ env.action_run_url }}
```

## Workflow options

You can change these options in the workflow `.yml` file to meet your desired configuration.
| Setting | Description |
| --- | --- |
| `SLACK_MESSAGE` <sup><sub>mandatory</sub></sup> | The Slack message to send |
| `SLACK_WEBHOOK` <sup><sub>mandatory</sub></sup> | The Slack Webhook URL defined in `Slack API APP settings -> Incoming Webhooks` |
| `ACTION_STATUS` <sup><sub>mandatory</sub></sup> | The GitHub Actions workflow status. Use `${{ job.status }}` to get the job state. |
| `ACTION_TEXT` <sup><sub>optional</sub></sup> | The Slack message action button text |
| `ACTION_URL` <sup><sub>optional</sub></sup> | The Slack message action button URL |
