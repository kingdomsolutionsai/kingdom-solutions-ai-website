# Private video media (not in Git)

Place the user-approved **13:46** preview as `Build_In_Right_Order_Website_Approved.mp4` here *only inside the trusted deployment build environment*, not the public git repository.

Its source in this conversation is `/mnt/data/Right_Order_Sneak_Peek_RETRY.mp4`. The reviewed source retains the four business gaps, right order teaching including the personal story, and introduction to eight systems; the participant scoring activity is excluded.

The app build copies the video to `dist/private_media`, outside the static `dist/public` directory. The stream endpoint requires a verified email ticket.

**Deployment not complete:** an MP4 upload to Render's build environment/storage is still required. Local sandbox files are not mounted into Render. Until the media has been staged and rebuilt, the watch page will say preview is not yet available. Do not merge/publish the landing page prematurely.

Video assets are not appropriate for GitHub commits; use trusted private storage/bucket/mount or a build artifact managed outside the public repository. For a durable production setup use private object storage with signed playback and long-lived rate limits.
