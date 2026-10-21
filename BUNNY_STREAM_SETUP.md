# Bunny Stream setup: Build in the Right Order™ preview

This is a staged integration, not a live playback feature yet.

1. Create Bunny Stream account and video library named "KSAI — Right-Order Video Experience".
2. Upload the **approved 13:46 original-footage version** of the sneak peek (NOT the previously rejected 9-minute or 25-minute edits).
3. Wait for Bunny Stream processing and preview it in the Bunny dashboard.
4. In the library Security area enable **Embed view token authentication**. If offered, restrict allowed embed domains to `www.kingdomsolutionsai.com` (without https://).
5. In your existing Render service `kingdom-solutions-ai-website`, set three environment variables:
   - `BUNNY_STREAM_LIBRARY_ID`: the numeric library ID (not secret)
   - `BUNNY_STREAM_VIDEO_ID`: the uploaded video's UUID (not secret)
   - `BUNNY_STREAM_TOKEN_KEY`: the embed token authentication key from the Security settings (**secret**; never share in a chat or commit to GitHub).
6. Render will redeploy after an environment change. Do not publish the marketing link until tests succeed.
7. Test both confirmed and unconfirmed users, Brevo contact lists, watch-page playback and seeking, desktop/mobile Safari, and expiration. The user approved a 13:46 preview; page description must match.
8. Verify that the November 17 live webinar registration lists are unchanged. Optional marketing consent remains unchecked by default.

The server creates a token with Bunny's documented SHA-256 hash of the token key + video UUID + expiration time. It returns a signed player iframe only after the email confirmation ticket is redeemed. The iframe URL is valid for one hour (not permanent protection from screen capture). For stricter controls, enable Bunny's supported domain and CDN restrictions as well.

Billing: bunny.net advertises a $1/month minimum for active services plus usage-based video storage and bandwidth. Monitor consumption, and configure spend limits or alerts.
