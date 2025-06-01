# 📣 Meta Lead Capture (NestJS + Prisma + PostgreSQL)

Welcome to **Meta Lead Capture** – the backend that catches your Facebook & Instagram leads faster than you can say "conversion rate optimization"!  
Built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and [PostgreSQL](https://www.postgresql.org/), this project is your bridge between Meta Lead Ads and your own database.

---

## 🚀 What does it do?

- **Receives** lead data from Facebook/Instagram Lead Ads via Meta's webhook.
- **Fetches** the full lead details from Meta's Graph API (because Meta only sends you a lead ID at first – sneaky!).
- **Stores** the leads in a shiny Postgres database using Prisma ORM.
- **Logs** everything so you can debug like a boss.

---

## 🛠️ How to run it locally

1. **Clone this repo**

   ```bash
   git clone <your-repo-url>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up your environment variables**  
   Create a `.env` file in the root:

   ```
   DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db>
   META_VERIFY_TOKEN=leads-capture-token
   META_PAGE_ACCESS_TOKEN=<your-facebook-page-access-token>
   ```

4. **Set up your database**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server**

   ```bash
   npm run start:dev
   ```

6. **Expose your local server to the world (Meta needs to talk to you!)**
   ```bash
   npx ngrok http 3000
   ```
   Use the generated ngrok URL as your webhook callback in the Meta App dashboard.

---

## 🧑‍💻 How does it work?

- **/webhook [GET]**: Handles Meta's "are you alive?" verification handshake.
- **/webhook [POST]**: Receives lead notifications, fetches the juicy details, and saves them to your DB.

---

## 📝 Meta App Setup (TL;DR)

1. Create a Meta app at [developers.facebook.com](https://developers.facebook.com/).
2. Add the **Webhooks** product.
3. Subscribe to the **Page** object and the **leadgen** field.
4. Use your ngrok URL + `/webhook` as the callback.
5. Use your `META_VERIFY_TOKEN` for verification.
6. Add your Facebook Page and get a Page Access Token.
7. Test with the [Lead Ads Testing Tool](https://developers.facebook.com/tools/lead-ads-testing).

---

## 🦾 Tech Stack

- **NestJS** – because REST should be restful.
- **Prisma** – for type-safe DB magic.
- **PostgreSQL** – because real devs use SQL (just kidding, but it's solid).
- **ngrok** – for when localhost just isn't enough.

---

## 🐞 Troubleshooting

- Not seeing webhooks? Check your ngrok logs and make sure your server is running.
- Meta not verifying? Double-check your verify token and callback URL.
- Still stuck? Try turning it off and on again. (Or open an issue!)

---

## 🤝 Contributing

This is a hobby project, but PRs are welcome!  
If you make it better, I'll buy you a virtual coffee ☕.

---

## 📜 License

MIT – Use it, break it, fix it, share it.

---

**Happy capturing!**  
_(And may your leads be ever in your favor.)_

# lead-capture
