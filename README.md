Project Reference

- [Traversy Media][traversy_media]

# How to run

please update the `./config/config.env` content as below before you run the program

```properties
# Application
PORT=3000
MONGO_URI=mongodb://localhost:27017/storybooks

# Session secret
SESSEION_SECRET=YOUR_SESSEION_SECRET

# Google oauth 2.0
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

```

start program

```bash
$ make dev
```

<!-- Reference -->

[traversy_media]: https://www.youtube.com/watch?v=SBvmnHTQIPY
[gcp]: https://console.cloud.google.com/
