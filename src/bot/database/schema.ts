import * as mongoose from "mongoose";

const guildConfigSchema = new mongoose.Schema(
    {
        guildId: {type: String, required: true},
        tempVoiceEnabled: {type: Boolean, required: true},
        tempVoiceChannelId: {type: String},
        tempVoiceCategoryId: {type: String},
        tempTextEnabled: {type: Boolean, required: true},
        tempTextChannelId: {type: String},
        tempTextCategoryId: {type: String},
        ticketsEnabled: {type: Boolean, required: true},
        ticketsMessageId: {type: String},
        ticketsCategoryId: {type: String},
    }
)

const tempVoiceSchema = new mongoose.Schema(
    {
        tempVoiceId: {type: String},
        guildId: {type: String, required: true},
        voiceChannelId: {type: String, required: true},
        ownerId: {type: String, required: true}
    }
)

const tempTextSchema = new mongoose.Schema(
    {
        tempTextId: {type: String},
        guildId: {type: String, required: true},
        textChannelId: {type: String, required: true},
        ownerId: {type: String, required: true}
    }
)

const ticketSchema = new mongoose.Schema(
    {
        ticketId: {type: String},
        guildId: {type: String, required: true},
        ticketChannelId: {type: String, required: true},
        ownerId: {type: String, required: true}
    }
)

tempVoiceSchema.pre('save', function(next) {
    const randomString = Math.random().toString(36).substring(2, 8);
    this.tempVoiceId = randomString;
    next();
});

export type GuildConfig = mongoose.InferSchemaType<typeof guildConfigSchema>;
export const GuildConfig = mongoose.model('GuildConfig', guildConfigSchema);

export type TempVoice = mongoose.InferSchemaType<typeof tempVoiceSchema>;
export const TempVoice = mongoose.model('TempVoice', tempVoiceSchema);