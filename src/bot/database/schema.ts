import * as mongoose from "mongoose";

const guildConfigSchema = new mongoose.Schema(
    {
        guildId: {type: String, required: true},
        tempVoiceChannelId: {type: String, required: true},
        tempVoiceCategoryId: {type: String, required: true}
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

tempVoiceSchema.pre('save', function(next) {
    const randomString = Math.random().toString(36).substring(2, 8);
    this.tempVoiceId = randomString;
    next();
});

export type GuildConfig = mongoose.InferSchemaType<typeof guildConfigSchema>;
export const GuildConfig = mongoose.model('GuildConfig', guildConfigSchema);

export type TempVoice = mongoose.InferSchemaType<typeof tempVoiceSchema>;
export const TempVoice = mongoose.model('TempVoice', tempVoiceSchema);