// Copyright 2010-2025 Google LLC
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { enumDesc, fileDesc, messageDesc } from "../../../@bufbuild/protobuf/dist/esm/codegenv2/index.js";
/**
 * Describes the file cp_model.proto.
 */
export const file_cp_model = /*@__PURE__*/ fileDesc("Cg5jcF9tb2RlbC5wcm90bxIXb3BlcmF0aW9uc19yZXNlYXJjaC5zYXQiNAoUSW50ZWdlclZhcmlhYmxlUHJvdG8SDAoEbmFtZRgBIAEoCRIOCgZkb21haW4YAiADKAMiJQoRQm9vbEFyZ3VtZW50UHJvdG8SEAoIbGl0ZXJhbHMYASADKAUiRQoVTGluZWFyRXhwcmVzc2lvblByb3RvEgwKBHZhcnMYASADKAUSDgoGY29lZmZzGAIgAygDEg4KBm9mZnNldBgDIAEoAyKUAQoTTGluZWFyQXJndW1lbnRQcm90bxI+CgZ0YXJnZXQYASABKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8SPQoFZXhwcnMYAiADKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8iXAobQWxsRGlmZmVyZW50Q29uc3RyYWludFByb3RvEj0KBWV4cHJzGAEgAygLMi4ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGluZWFyRXhwcmVzc2lvblByb3RvIkUKFUxpbmVhckNvbnN0cmFpbnRQcm90bxIMCgR2YXJzGAEgAygFEg4KBmNvZWZmcxgCIAMoAxIOCgZkb21haW4YAyADKAMikQIKFkVsZW1lbnRDb25zdHJhaW50UHJvdG8SDQoFaW5kZXgYASABKAUSDgoGdGFyZ2V0GAIgASgFEgwKBHZhcnMYAyADKAUSRAoMbGluZWFyX2luZGV4GAQgASgLMi4ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGluZWFyRXhwcmVzc2lvblByb3RvEkUKDWxpbmVhcl90YXJnZXQYBSABKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8SPQoFZXhwcnMYBiADKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8i0wEKF0ludGVydmFsQ29uc3RyYWludFByb3RvEj0KBXN0YXJ0GAQgASgLMi4ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGluZWFyRXhwcmVzc2lvblByb3RvEjsKA2VuZBgFIAEoCzIuLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkxpbmVhckV4cHJlc3Npb25Qcm90bxI8CgRzaXplGAYgASgLMi4ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGluZWFyRXhwcmVzc2lvblByb3RvIi0KGE5vT3ZlcmxhcENvbnN0cmFpbnRQcm90bxIRCglpbnRlcnZhbHMYASADKAUiRgoaTm9PdmVybGFwMkRDb25zdHJhaW50UHJvdG8SEwoLeF9pbnRlcnZhbHMYASADKAUSEwoLeV9pbnRlcnZhbHMYAiADKAUisQEKGUN1bXVsYXRpdmVDb25zdHJhaW50UHJvdG8SQAoIY2FwYWNpdHkYASABKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8SEQoJaW50ZXJ2YWxzGAIgAygFEj8KB2RlbWFuZHMYAyADKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8i6gEKGFJlc2Vydm9pckNvbnN0cmFpbnRQcm90bxIRCgltaW5fbGV2ZWwYASABKAMSEQoJbWF4X2xldmVsGAIgASgDEkIKCnRpbWVfZXhwcnMYAyADKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8SRQoNbGV2ZWxfY2hhbmdlcxgGIAMoCzIuLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkxpbmVhckV4cHJlc3Npb25Qcm90bxIXCg9hY3RpdmVfbGl0ZXJhbHMYBSADKAVKBAgEEAUiSAoWQ2lyY3VpdENvbnN0cmFpbnRQcm90bxINCgV0YWlscxgDIAMoBRINCgVoZWFkcxgEIAMoBRIQCghsaXRlcmFscxgFIAMoBSKQAgoVUm91dGVzQ29uc3RyYWludFByb3RvEg0KBXRhaWxzGAEgAygFEg0KBWhlYWRzGAIgAygFEhAKCGxpdGVyYWxzGAMgAygFEg8KB2RlbWFuZHMYBCADKAUSEAoIY2FwYWNpdHkYBSABKAMSUgoKZGltZW5zaW9ucxgGIAMoCzI+Lm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LlJvdXRlc0NvbnN0cmFpbnRQcm90by5Ob2RlRXhwcmVzc2lvbnMaUAoPTm9kZUV4cHJlc3Npb25zEj0KBWV4cHJzGAEgAygLMi4ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGluZWFyRXhwcmVzc2lvblByb3RvIoQBChRUYWJsZUNvbnN0cmFpbnRQcm90bxIMCgR2YXJzGAEgAygFEg4KBnZhbHVlcxgCIAMoAxI9CgVleHBycxgEIAMoCzIuLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkxpbmVhckV4cHJlc3Npb25Qcm90bxIPCgduZWdhdGVkGAMgASgIIj0KFkludmVyc2VDb25zdHJhaW50UHJvdG8SEAoIZl9kaXJlY3QYASADKAUSEQoJZl9pbnZlcnNlGAIgAygFIuEBChhBdXRvbWF0b25Db25zdHJhaW50UHJvdG8SFgoOc3RhcnRpbmdfc3RhdGUYAiABKAMSFAoMZmluYWxfc3RhdGVzGAMgAygDEhcKD3RyYW5zaXRpb25fdGFpbBgEIAMoAxIXCg90cmFuc2l0aW9uX2hlYWQYBSADKAMSGAoQdHJhbnNpdGlvbl9sYWJlbBgGIAMoAxIMCgR2YXJzGAcgAygFEj0KBWV4cHJzGAggAygLMi4ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGluZWFyRXhwcmVzc2lvblByb3RvIiQKFExpc3RPZlZhcmlhYmxlc1Byb3RvEgwKBHZhcnMYASADKAUi8AwKD0NvbnN0cmFpbnRQcm90bxIMCgRuYW1lGAEgASgJEhsKE2VuZm9yY2VtZW50X2xpdGVyYWwYAiADKAUSPQoHYm9vbF9vchgDIAEoCzIqLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkJvb2xBcmd1bWVudFByb3RvSAASPgoIYm9vbF9hbmQYBCABKAsyKi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5Cb29sQXJndW1lbnRQcm90b0gAEkEKC2F0X21vc3Rfb25lGBogASgLMioub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuQm9vbEFyZ3VtZW50UHJvdG9IABJBCgtleGFjdGx5X29uZRgdIAEoCzIqLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkJvb2xBcmd1bWVudFByb3RvSAASPgoIYm9vbF94b3IYBSABKAsyKi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5Cb29sQXJndW1lbnRQcm90b0gAEj8KB2ludF9kaXYYByABKAsyLC5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJBcmd1bWVudFByb3RvSAASPwoHaW50X21vZBgIIAEoCzIsLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkxpbmVhckFyZ3VtZW50UHJvdG9IABJACghpbnRfcHJvZBgLIAEoCzIsLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkxpbmVhckFyZ3VtZW50UHJvdG9IABI/CgdsaW5fbWF4GBsgASgLMiwub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGluZWFyQXJndW1lbnRQcm90b0gAEkAKBmxpbmVhchgMIAEoCzIuLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkxpbmVhckNvbnN0cmFpbnRQcm90b0gAEkgKCGFsbF9kaWZmGA0gASgLMjQub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuQWxsRGlmZmVyZW50Q29uc3RyYWludFByb3RvSAASQgoHZWxlbWVudBgOIAEoCzIvLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkVsZW1lbnRDb25zdHJhaW50UHJvdG9IABJCCgdjaXJjdWl0GA8gASgLMi8ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuQ2lyY3VpdENvbnN0cmFpbnRQcm90b0gAEkAKBnJvdXRlcxgXIAEoCzIuLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LlJvdXRlc0NvbnN0cmFpbnRQcm90b0gAEj4KBXRhYmxlGBAgASgLMi0ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuVGFibGVDb25zdHJhaW50UHJvdG9IABJGCglhdXRvbWF0b24YESABKAsyMS5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5BdXRvbWF0b25Db25zdHJhaW50UHJvdG9IABJCCgdpbnZlcnNlGBIgASgLMi8ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuSW52ZXJzZUNvbnN0cmFpbnRQcm90b0gAEkYKCXJlc2Vydm9pchgYIAEoCzIxLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LlJlc2Vydm9pckNvbnN0cmFpbnRQcm90b0gAEkQKCGludGVydmFsGBMgASgLMjAub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuSW50ZXJ2YWxDb25zdHJhaW50UHJvdG9IABJHCgpub19vdmVybGFwGBQgASgLMjEub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTm9PdmVybGFwQ29uc3RyYWludFByb3RvSAASTAoNbm9fb3ZlcmxhcF8yZBgVIAEoCzIzLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0Lk5vT3ZlcmxhcDJEQ29uc3RyYWludFByb3RvSAASSAoKY3VtdWxhdGl2ZRgWIAEoCzIyLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkN1bXVsYXRpdmVDb25zdHJhaW50UHJvdG9IABJJChBkdW1teV9jb25zdHJhaW50GB4gASgLMi0ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuTGlzdE9mVmFyaWFibGVzUHJvdG9IAEIMCgpjb25zdHJhaW50IuABChBDcE9iamVjdGl2ZVByb3RvEgwKBHZhcnMYASADKAUSDgoGY29lZmZzGAQgAygDEg4KBm9mZnNldBgCIAEoARIWCg5zY2FsaW5nX2ZhY3RvchgDIAEoARIOCgZkb21haW4YBSADKAMSGQoRc2NhbGluZ193YXNfZXhhY3QYBiABKAgSHQoVaW50ZWdlcl9iZWZvcmVfb2Zmc2V0GAcgASgDEhwKFGludGVnZXJfYWZ0ZXJfb2Zmc2V0GAkgASgDEh4KFmludGVnZXJfc2NhbGluZ19mYWN0b3IYCCABKAMiVQoTRmxvYXRPYmplY3RpdmVQcm90bxIMCgR2YXJzGAEgAygFEg4KBmNvZWZmcxgCIAMoARIOCgZvZmZzZXQYAyABKAESEAoIbWF4aW1pemUYBCABKAgigQUKFURlY2lzaW9uU3RyYXRlZ3lQcm90bxIRCgl2YXJpYWJsZXMYASADKAUSPQoFZXhwcnMYBSADKAsyLi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5MaW5lYXJFeHByZXNzaW9uUHJvdG8SbQobdmFyaWFibGVfc2VsZWN0aW9uX3N0cmF0ZWd5GAIgASgOMkgub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuRGVjaXNpb25TdHJhdGVneVByb3RvLlZhcmlhYmxlU2VsZWN0aW9uU3RyYXRlZ3kSaQoZZG9tYWluX3JlZHVjdGlvbl9zdHJhdGVneRgDIAEoDjJGLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkRlY2lzaW9uU3RyYXRlZ3lQcm90by5Eb21haW5SZWR1Y3Rpb25TdHJhdGVneSKUAQoZVmFyaWFibGVTZWxlY3Rpb25TdHJhdGVneRIQCgxDSE9PU0VfRklSU1QQABIVChFDSE9PU0VfTE9XRVNUX01JThABEhYKEkNIT09TRV9ISUdIRVNUX01BWBACEhoKFkNIT09TRV9NSU5fRE9NQUlOX1NJWkUQAxIaChZDSE9PU0VfTUFYX0RPTUFJTl9TSVpFEAQipAEKF0RvbWFpblJlZHVjdGlvblN0cmF0ZWd5EhQKEFNFTEVDVF9NSU5fVkFMVUUQABIUChBTRUxFQ1RfTUFYX1ZBTFVFEAESFQoRU0VMRUNUX0xPV0VSX0hBTEYQAhIVChFTRUxFQ1RfVVBQRVJfSEFMRhADEhcKE1NFTEVDVF9NRURJQU5fVkFMVUUQBBIWChJTRUxFQ1RfUkFORE9NX0hBTEYQBSI5ChlQYXJ0aWFsVmFyaWFibGVBc3NpZ25tZW50EgwKBHZhcnMYASADKAUSDgoGdmFsdWVzGAIgAygDIj4KFlNwYXJzZVBlcm11dGF0aW9uUHJvdG8SDwoHc3VwcG9ydBgBIAMoBRITCgtjeWNsZV9zaXplcxgCIAMoBSJHChBEZW5zZU1hdHJpeFByb3RvEhAKCG51bV9yb3dzGAEgASgFEhAKCG51bV9jb2xzGAIgASgFEg8KB2VudHJpZXMYAyADKAUilAEKDVN5bW1ldHJ5UHJvdG8SRQoMcGVybXV0YXRpb25zGAEgAygLMi8ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuU3BhcnNlUGVybXV0YXRpb25Qcm90bxI8CglvcmJpdG9wZXMYAiADKAsyKS5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5EZW5zZU1hdHJpeFByb3RvIo4ECgxDcE1vZGVsUHJvdG8SDAoEbmFtZRgBIAEoCRJACgl2YXJpYWJsZXMYAiADKAsyLS5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5JbnRlZ2VyVmFyaWFibGVQcm90bxI9Cgtjb25zdHJhaW50cxgDIAMoCzIoLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkNvbnN0cmFpbnRQcm90bxI8CglvYmplY3RpdmUYBCABKAsyKS5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5DcE9iamVjdGl2ZVByb3RvEk4KGGZsb2F0aW5nX3BvaW50X29iamVjdGl2ZRgJIAEoCzIsLm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LkZsb2F0T2JqZWN0aXZlUHJvdG8SRwoPc2VhcmNoX3N0cmF0ZWd5GAUgAygLMi4ub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuRGVjaXNpb25TdHJhdGVneVByb3RvEkkKDXNvbHV0aW9uX2hpbnQYBiABKAsyMi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5QYXJ0aWFsVmFyaWFibGVBc3NpZ25tZW50EhMKC2Fzc3VtcHRpb25zGAcgAygFEjgKCHN5bW1ldHJ5GAggASgLMiYub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuU3ltbWV0cnlQcm90byIiChBDcFNvbHZlclNvbHV0aW9uEg4KBnZhbHVlcxgBIAMoAyKxBgoQQ3BTb2x2ZXJSZXNwb25zZRI3CgZzdGF0dXMYASABKA4yJy5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5DcFNvbHZlclN0YXR1cxIQCghzb2x1dGlvbhgCIAMoAxIXCg9vYmplY3RpdmVfdmFsdWUYAyABKAESHAoUYmVzdF9vYmplY3RpdmVfYm91bmQYBCABKAESRwoUYWRkaXRpb25hbF9zb2x1dGlvbnMYGyADKAsyKS5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5DcFNvbHZlclNvbHV0aW9uEkoKE3RpZ2h0ZW5lZF92YXJpYWJsZXMYFSADKAsyLS5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5JbnRlZ2VyVmFyaWFibGVQcm90bxIwCihzdWZmaWNpZW50X2Fzc3VtcHRpb25zX2Zvcl9pbmZlYXNpYmlsaXR5GBcgAygFEkQKEWludGVnZXJfb2JqZWN0aXZlGBwgASgLMikub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuQ3BPYmplY3RpdmVQcm90bxIjChtpbm5lcl9vYmplY3RpdmVfbG93ZXJfYm91bmQYHSABKAMSFAoMbnVtX2ludGVnZXJzGB4gASgDEhQKDG51bV9ib29sZWFucxgKIAEoAxIaChJudW1fZml4ZWRfYm9vbGVhbnMYHyABKAMSFQoNbnVtX2NvbmZsaWN0cxgLIAEoAxIUCgxudW1fYnJhbmNoZXMYDCABKAMSHwoXbnVtX2JpbmFyeV9wcm9wYWdhdGlvbnMYDSABKAMSIAoYbnVtX2ludGVnZXJfcHJvcGFnYXRpb25zGA4gASgDEhQKDG51bV9yZXN0YXJ0cxgYIAEoAxIZChFudW1fbHBfaXRlcmF0aW9ucxgZIAEoAxIRCgl3YWxsX3RpbWUYDyABKAESEQoJdXNlcl90aW1lGBAgASgBEhoKEmRldGVybWluaXN0aWNfdGltZRgRIAEoARIUCgxnYXBfaW50ZWdyYWwYFiABKAESFQoNc29sdXRpb25faW5mbxgUIAEoCRIRCglzb2x2ZV9sb2cYGiABKAkqWwoOQ3BTb2x2ZXJTdGF0dXMSCwoHVU5LTk9XThAAEhEKDU1PREVMX0lOVkFMSUQQARIMCghGRUFTSUJMRRACEg4KCklORkVBU0lCTEUQAxILCgdPUFRJTUFMEARCdgoWY29tLmdvb2dsZS5vcnRvb2xzLnNhdEIPQ3BNb2RlbFByb3RvYnVmUAFaNGdpdGh1Yi5jb20vZ29vZ2xlL29yLXRvb2xzL29ydG9vbHMvc2F0L3Byb3RvL2NwbW9kZWyqAhJHb29nbGUuT3JUb29scy5TYXRiBnByb3RvMw");
/**
 * Describes the message operations_research.sat.IntegerVariableProto.
 * Use `create(IntegerVariableProtoSchema)` to create a new message.
 */
export const IntegerVariableProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 0);
/**
 * Describes the message operations_research.sat.BoolArgumentProto.
 * Use `create(BoolArgumentProtoSchema)` to create a new message.
 */
export const BoolArgumentProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 1);
/**
 * Describes the message operations_research.sat.LinearExpressionProto.
 * Use `create(LinearExpressionProtoSchema)` to create a new message.
 */
export const LinearExpressionProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 2);
/**
 * Describes the message operations_research.sat.LinearArgumentProto.
 * Use `create(LinearArgumentProtoSchema)` to create a new message.
 */
export const LinearArgumentProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 3);
/**
 * Describes the message operations_research.sat.AllDifferentConstraintProto.
 * Use `create(AllDifferentConstraintProtoSchema)` to create a new message.
 */
export const AllDifferentConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 4);
/**
 * Describes the message operations_research.sat.LinearConstraintProto.
 * Use `create(LinearConstraintProtoSchema)` to create a new message.
 */
export const LinearConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 5);
/**
 * Describes the message operations_research.sat.ElementConstraintProto.
 * Use `create(ElementConstraintProtoSchema)` to create a new message.
 */
export const ElementConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 6);
/**
 * Describes the message operations_research.sat.IntervalConstraintProto.
 * Use `create(IntervalConstraintProtoSchema)` to create a new message.
 */
export const IntervalConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 7);
/**
 * Describes the message operations_research.sat.NoOverlapConstraintProto.
 * Use `create(NoOverlapConstraintProtoSchema)` to create a new message.
 */
export const NoOverlapConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 8);
/**
 * Describes the message operations_research.sat.NoOverlap2DConstraintProto.
 * Use `create(NoOverlap2DConstraintProtoSchema)` to create a new message.
 */
export const NoOverlap2DConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 9);
/**
 * Describes the message operations_research.sat.CumulativeConstraintProto.
 * Use `create(CumulativeConstraintProtoSchema)` to create a new message.
 */
export const CumulativeConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 10);
/**
 * Describes the message operations_research.sat.ReservoirConstraintProto.
 * Use `create(ReservoirConstraintProtoSchema)` to create a new message.
 */
export const ReservoirConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 11);
/**
 * Describes the message operations_research.sat.CircuitConstraintProto.
 * Use `create(CircuitConstraintProtoSchema)` to create a new message.
 */
export const CircuitConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 12);
/**
 * Describes the message operations_research.sat.RoutesConstraintProto.
 * Use `create(RoutesConstraintProtoSchema)` to create a new message.
 */
export const RoutesConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 13);
/**
 * Describes the message operations_research.sat.RoutesConstraintProto.NodeExpressions.
 * Use `create(RoutesConstraintProto_NodeExpressionsSchema)` to create a new message.
 */
export const RoutesConstraintProto_NodeExpressionsSchema = /*@__PURE__*/ messageDesc(file_cp_model, 13, 0);
/**
 * Describes the message operations_research.sat.TableConstraintProto.
 * Use `create(TableConstraintProtoSchema)` to create a new message.
 */
export const TableConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 14);
/**
 * Describes the message operations_research.sat.InverseConstraintProto.
 * Use `create(InverseConstraintProtoSchema)` to create a new message.
 */
export const InverseConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 15);
/**
 * Describes the message operations_research.sat.AutomatonConstraintProto.
 * Use `create(AutomatonConstraintProtoSchema)` to create a new message.
 */
export const AutomatonConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 16);
/**
 * Describes the message operations_research.sat.ListOfVariablesProto.
 * Use `create(ListOfVariablesProtoSchema)` to create a new message.
 */
export const ListOfVariablesProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 17);
/**
 * Describes the message operations_research.sat.ConstraintProto.
 * Use `create(ConstraintProtoSchema)` to create a new message.
 */
export const ConstraintProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 18);
/**
 * Describes the message operations_research.sat.CpObjectiveProto.
 * Use `create(CpObjectiveProtoSchema)` to create a new message.
 */
export const CpObjectiveProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 19);
/**
 * Describes the message operations_research.sat.FloatObjectiveProto.
 * Use `create(FloatObjectiveProtoSchema)` to create a new message.
 */
export const FloatObjectiveProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 20);
/**
 * Describes the message operations_research.sat.DecisionStrategyProto.
 * Use `create(DecisionStrategyProtoSchema)` to create a new message.
 */
export const DecisionStrategyProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 21);
/**
 * The order in which the variables (resp. affine expression) above should be
 * considered. Note that only variables that are not already fixed are
 * considered.
 *
 * TODO(user): extend as needed.
 *
 * @generated from enum operations_research.sat.DecisionStrategyProto.VariableSelectionStrategy
 */
export var DecisionStrategyProto_VariableSelectionStrategy;
(function (DecisionStrategyProto_VariableSelectionStrategy) {
    /**
     * @generated from enum value: CHOOSE_FIRST = 0;
     */
    DecisionStrategyProto_VariableSelectionStrategy[DecisionStrategyProto_VariableSelectionStrategy["CHOOSE_FIRST"] = 0] = "CHOOSE_FIRST";
    /**
     * @generated from enum value: CHOOSE_LOWEST_MIN = 1;
     */
    DecisionStrategyProto_VariableSelectionStrategy[DecisionStrategyProto_VariableSelectionStrategy["CHOOSE_LOWEST_MIN"] = 1] = "CHOOSE_LOWEST_MIN";
    /**
     * @generated from enum value: CHOOSE_HIGHEST_MAX = 2;
     */
    DecisionStrategyProto_VariableSelectionStrategy[DecisionStrategyProto_VariableSelectionStrategy["CHOOSE_HIGHEST_MAX"] = 2] = "CHOOSE_HIGHEST_MAX";
    /**
     * @generated from enum value: CHOOSE_MIN_DOMAIN_SIZE = 3;
     */
    DecisionStrategyProto_VariableSelectionStrategy[DecisionStrategyProto_VariableSelectionStrategy["CHOOSE_MIN_DOMAIN_SIZE"] = 3] = "CHOOSE_MIN_DOMAIN_SIZE";
    /**
     * @generated from enum value: CHOOSE_MAX_DOMAIN_SIZE = 4;
     */
    DecisionStrategyProto_VariableSelectionStrategy[DecisionStrategyProto_VariableSelectionStrategy["CHOOSE_MAX_DOMAIN_SIZE"] = 4] = "CHOOSE_MAX_DOMAIN_SIZE";
})(DecisionStrategyProto_VariableSelectionStrategy || (DecisionStrategyProto_VariableSelectionStrategy = {}));
/**
 * Describes the enum operations_research.sat.DecisionStrategyProto.VariableSelectionStrategy.
 */
export const DecisionStrategyProto_VariableSelectionStrategySchema = /*@__PURE__*/ enumDesc(file_cp_model, 21, 0);
/**
 * Once a variable (resp. affine expression) has been chosen, this enum
 * describe what decision is taken on its domain.
 *
 * TODO(user): extend as needed.
 *
 * @generated from enum operations_research.sat.DecisionStrategyProto.DomainReductionStrategy
 */
export var DecisionStrategyProto_DomainReductionStrategy;
(function (DecisionStrategyProto_DomainReductionStrategy) {
    /**
     * @generated from enum value: SELECT_MIN_VALUE = 0;
     */
    DecisionStrategyProto_DomainReductionStrategy[DecisionStrategyProto_DomainReductionStrategy["SELECT_MIN_VALUE"] = 0] = "SELECT_MIN_VALUE";
    /**
     * @generated from enum value: SELECT_MAX_VALUE = 1;
     */
    DecisionStrategyProto_DomainReductionStrategy[DecisionStrategyProto_DomainReductionStrategy["SELECT_MAX_VALUE"] = 1] = "SELECT_MAX_VALUE";
    /**
     * @generated from enum value: SELECT_LOWER_HALF = 2;
     */
    DecisionStrategyProto_DomainReductionStrategy[DecisionStrategyProto_DomainReductionStrategy["SELECT_LOWER_HALF"] = 2] = "SELECT_LOWER_HALF";
    /**
     * @generated from enum value: SELECT_UPPER_HALF = 3;
     */
    DecisionStrategyProto_DomainReductionStrategy[DecisionStrategyProto_DomainReductionStrategy["SELECT_UPPER_HALF"] = 3] = "SELECT_UPPER_HALF";
    /**
     * @generated from enum value: SELECT_MEDIAN_VALUE = 4;
     */
    DecisionStrategyProto_DomainReductionStrategy[DecisionStrategyProto_DomainReductionStrategy["SELECT_MEDIAN_VALUE"] = 4] = "SELECT_MEDIAN_VALUE";
    /**
     * @generated from enum value: SELECT_RANDOM_HALF = 5;
     */
    DecisionStrategyProto_DomainReductionStrategy[DecisionStrategyProto_DomainReductionStrategy["SELECT_RANDOM_HALF"] = 5] = "SELECT_RANDOM_HALF";
})(DecisionStrategyProto_DomainReductionStrategy || (DecisionStrategyProto_DomainReductionStrategy = {}));
/**
 * Describes the enum operations_research.sat.DecisionStrategyProto.DomainReductionStrategy.
 */
export const DecisionStrategyProto_DomainReductionStrategySchema = /*@__PURE__*/ enumDesc(file_cp_model, 21, 1);
/**
 * Describes the message operations_research.sat.PartialVariableAssignment.
 * Use `create(PartialVariableAssignmentSchema)` to create a new message.
 */
export const PartialVariableAssignmentSchema = /*@__PURE__*/ messageDesc(file_cp_model, 22);
/**
 * Describes the message operations_research.sat.SparsePermutationProto.
 * Use `create(SparsePermutationProtoSchema)` to create a new message.
 */
export const SparsePermutationProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 23);
/**
 * Describes the message operations_research.sat.DenseMatrixProto.
 * Use `create(DenseMatrixProtoSchema)` to create a new message.
 */
export const DenseMatrixProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 24);
/**
 * Describes the message operations_research.sat.SymmetryProto.
 * Use `create(SymmetryProtoSchema)` to create a new message.
 */
export const SymmetryProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 25);
/**
 * Describes the message operations_research.sat.CpModelProto.
 * Use `create(CpModelProtoSchema)` to create a new message.
 */
export const CpModelProtoSchema = /*@__PURE__*/ messageDesc(file_cp_model, 26);
/**
 * Describes the message operations_research.sat.CpSolverSolution.
 * Use `create(CpSolverSolutionSchema)` to create a new message.
 */
export const CpSolverSolutionSchema = /*@__PURE__*/ messageDesc(file_cp_model, 27);
/**
 * Describes the message operations_research.sat.CpSolverResponse.
 * Use `create(CpSolverResponseSchema)` to create a new message.
 */
export const CpSolverResponseSchema = /*@__PURE__*/ messageDesc(file_cp_model, 28);
/**
 * The status returned by a solver trying to solve a CpModelProto.
 *
 * @generated from enum operations_research.sat.CpSolverStatus
 */
export var CpSolverStatus;
(function (CpSolverStatus) {
    /**
     * The status of the model is still unknown. A search limit has been reached
     * before any of the statuses below could be determined.
     *
     * @generated from enum value: UNKNOWN = 0;
     */
    CpSolverStatus[CpSolverStatus["UNKNOWN"] = 0] = "UNKNOWN";
    /**
     * The given CpModelProto didn't pass the validation step. You can get a
     * detailed error by calling ValidateCpModel(model_proto).
     *
     * @generated from enum value: MODEL_INVALID = 1;
     */
    CpSolverStatus[CpSolverStatus["MODEL_INVALID"] = 1] = "MODEL_INVALID";
    /**
     * A feasible solution has been found. But the search was stopped before we
     * could prove optimality or before we enumerated all solutions of a
     * feasibility problem (if asked).
     *
     * @generated from enum value: FEASIBLE = 2;
     */
    CpSolverStatus[CpSolverStatus["FEASIBLE"] = 2] = "FEASIBLE";
    /**
     * The problem has been proven infeasible.
     *
     * @generated from enum value: INFEASIBLE = 3;
     */
    CpSolverStatus[CpSolverStatus["INFEASIBLE"] = 3] = "INFEASIBLE";
    /**
     * An optimal feasible solution has been found.
     *
     * More generally, this status represent a success. So we also return OPTIMAL
     * if we find a solution for a pure feasibility problem or if a gap limit has
     * been specified and we return a solution within this limit. In the case
     * where we need to return all the feasible solution, this status will only be
     * returned if we enumerated all of them; If we stopped before, we will return
     * FEASIBLE.
     *
     * @generated from enum value: OPTIMAL = 4;
     */
    CpSolverStatus[CpSolverStatus["OPTIMAL"] = 4] = "OPTIMAL";
})(CpSolverStatus || (CpSolverStatus = {}));
/**
 * Describes the enum operations_research.sat.CpSolverStatus.
 */
export const CpSolverStatusSchema = /*@__PURE__*/ enumDesc(file_cp_model, 0);
//# sourceMappingURL=cp_model_pb.js.map