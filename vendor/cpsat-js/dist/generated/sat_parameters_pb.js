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
 * Describes the file sat_parameters.proto.
 */
export const file_sat_parameters = /*@__PURE__*/ fileDesc("ChRzYXRfcGFyYW1ldGVycy5wcm90bxIXb3BlcmF0aW9uc19yZXNlYXJjaC5zYXQinHUKDVNhdFBhcmFtZXRlcnMSDwoEbmFtZRirASABKAk6ABJgChhwcmVmZXJyZWRfdmFyaWFibGVfb3JkZXIYASABKA4yNC5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5TYXRQYXJhbWV0ZXJzLlZhcmlhYmxlT3JkZXI6CElOX09SREVSElkKEGluaXRpYWxfcG9sYXJpdHkYAiABKA4yLy5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5TYXRQYXJhbWV0ZXJzLlBvbGFyaXR5Og5QT0xBUklUWV9GQUxTRRIeChB1c2VfcGhhc2Vfc2F2aW5nGCwgASgIOgR0cnVlEikKGnBvbGFyaXR5X3JlcGhhc2VfaW5jcmVtZW50GKgBIAEoBToEMTAwMBIpChlwb2xhcml0eV9leHBsb2l0X2xzX2hpbnRzGLUCIAEoCDoFZmFsc2USIAoVcmFuZG9tX3BvbGFyaXR5X3JhdGlvGC0gASgBOgEwEiAKFXJhbmRvbV9icmFuY2hlc19yYXRpbxggIAEoAToBMBIhChJ1c2VfZXJ3YV9oZXVyaXN0aWMYSyABKAg6BWZhbHNlEiUKGmluaXRpYWxfdmFyaWFibGVzX2FjdGl2aXR5GEwgASgBOgEwEjYKJ2Fsc29fYnVtcF92YXJpYWJsZXNfaW5fY29uZmxpY3RfcmVhc29ucxhNIAEoCDoFZmFsc2USbwoWbWluaW1pemF0aW9uX2FsZ29yaXRobRgEIAEoDjJELm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LlNhdFBhcmFtZXRlcnMuQ29uZmxpY3RNaW5pbWl6YXRpb25BbGdvcml0aG06CVJFQ1VSU0lWRRKTAQodYmluYXJ5X21pbmltaXphdGlvbl9hbGdvcml0aG0YIiABKA4yQC5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5TYXRQYXJhbWV0ZXJzLkJpbmFyeU1pbml6YXRpb25BbGdvcml0aG06KkJJTkFSWV9NSU5JTUlaQVRJT05fRlJPTV9VSVBfQU5EX0RFQ0lTSU9OUxIyCiRzdWJzdW1wdGlvbl9kdXJpbmdfY29uZmxpY3RfYW5hbHlzaXMYOCABKAg6BHRydWUSOQoqZXh0cmFfc3Vic3VtcHRpb25fZHVyaW5nX2NvbmZsaWN0X2FuYWx5c2lzGN8CIAEoCDoEdHJ1ZRI8Ci1kZWNpc2lvbl9zdWJzdW1wdGlvbl9kdXJpbmdfY29uZmxpY3RfYW5hbHlzaXMY4QIgASgIOgR0cnVlEiwKIGVhZ2VybHlfc3Vic3VtZV9sYXN0X25fY29uZmxpY3RzGNcCIAEoBToBNBIqChtzdWJzdW1lX2R1cmluZ192aXZpZmljYXRpb24Y4wIgASgIOgR0cnVlEi4KHnVzZV9jaHJvbm9sb2dpY2FsX2JhY2t0cmFja2luZxjKAiABKAg6BWZhbHNlEiAKE21heF9iYWNranVtcF9sZXZlbHMYywIgASgFOgI1MBI0CiVjaHJvbm9sb2dpY2FsX2JhY2t0cmFja19taW5fY29uZmxpY3RzGMwCIAEoBToEMTAwMBIkChVjbGF1c2VfY2xlYW51cF9wZXJpb2QYCyABKAU6BTEwMDAwEisKH2NsYXVzZV9jbGVhbnVwX3BlcmlvZF9pbmNyZW1lbnQY0QIgASgFOgEwEiAKFWNsYXVzZV9jbGVhbnVwX3RhcmdldBgNIAEoBToBMBIiChRjbGF1c2VfY2xlYW51cF9yYXRpbxi+ASABKAE6AzAuNRIjChhjbGF1c2VfY2xlYW51cF9sYmRfYm91bmQYOyABKAU6ATUSJAoYY2xhdXNlX2NsZWFudXBfbGJkX3RpZXIxGN0CIAEoBToBMBIkChhjbGF1c2VfY2xlYW51cF9sYmRfdGllcjIY3gIgASgFOgEwEmcKF2NsYXVzZV9jbGVhbnVwX29yZGVyaW5nGDwgASgOMjUub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuU2F0UGFyYW1ldGVycy5DbGF1c2VPcmRlcmluZzoPQ0xBVVNFX0FDVElWSVRZEiEKFHBiX2NsZWFudXBfaW5jcmVtZW50GC4gASgFOgMyMDASHQoQcGJfY2xlYW51cF9yYXRpbxgvIAEoAToDMC41EiQKF3ZhcmlhYmxlX2FjdGl2aXR5X2RlY2F5GA8gASgBOgMwLjgSKwobbWF4X3ZhcmlhYmxlX2FjdGl2aXR5X3ZhbHVlGBAgASgBOgYxZSsxMDASHwoRZ2x1Y29zZV9tYXhfZGVjYXkYFiABKAE6BDAuOTUSJQoXZ2x1Y29zZV9kZWNheV9pbmNyZW1lbnQYFyABKAE6BDAuMDESLAoeZ2x1Y29zZV9kZWNheV9pbmNyZW1lbnRfcGVyaW9kGBggASgFOgQ1MDAwEiQKFWNsYXVzZV9hY3Rpdml0eV9kZWNheRgRIAEoAToFMC45OTkSKAoZbWF4X2NsYXVzZV9hY3Rpdml0eV92YWx1ZRgSIAEoAToFMWUrMjASUwoScmVzdGFydF9hbGdvcml0aG1zGD0gAygOMjcub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuU2F0UGFyYW1ldGVycy5SZXN0YXJ0QWxnb3JpdGhtEmUKGmRlZmF1bHRfcmVzdGFydF9hbGdvcml0aG1zGEYgASgJOkFMVUJZX1JFU1RBUlQsTEJEX01PVklOR19BVkVSQUdFX1JFU1RBUlQsRExfTU9WSU5HX0FWRVJBR0VfUkVTVEFSVBIaCg5yZXN0YXJ0X3BlcmlvZBgeIAEoBToCNTASJwobcmVzdGFydF9ydW5uaW5nX3dpbmRvd19zaXplGD4gASgFOgI1MBIjChhyZXN0YXJ0X2RsX2F2ZXJhZ2VfcmF0aW8YPyABKAE6ATESJAoZcmVzdGFydF9sYmRfYXZlcmFnZV9yYXRpbxhHIAEoAToBMRIjChR1c2VfYmxvY2tpbmdfcmVzdGFydBhAIAEoCDoFZmFsc2USKgocYmxvY2tpbmdfcmVzdGFydF93aW5kb3dfc2l6ZRhBIAEoBToENTAwMBIoChtibG9ja2luZ19yZXN0YXJ0X211bHRpcGxpZXIYQiABKAE6AzEuNBIwCiVudW1fY29uZmxpY3RzX2JlZm9yZV9zdHJhdGVneV9jaGFuZ2VzGEQgASgFOgEwEikKHnN0cmF0ZWd5X2NoYW5nZV9pbmNyZWFzZV9yYXRpbxhFIAEoAToBMBIgChNtYXhfdGltZV9pbl9zZWNvbmRzGCQgASgBOgNpbmYSIwoWbWF4X2RldGVybWluaXN0aWNfdGltZRhDIAEoAToDaW5mEikKHW1heF9udW1fZGV0ZXJtaW5pc3RpY19iYXRjaGVzGKMCIAEoBToBMBI0ChdtYXhfbnVtYmVyX29mX2NvbmZsaWN0cxglIAEoAzoTOTIyMzM3MjAzNjg1NDc3NTgwNxIfChBtYXhfbWVtb3J5X2luX21iGCggASgDOgUxMDAwMBIjChJhYnNvbHV0ZV9nYXBfbGltaXQYnwEgASgBOgYwLjAwMDESHgoScmVsYXRpdmVfZ2FwX2xpbWl0GKABIAEoAToBMBIWCgtyYW5kb21fc2VlZBgfIAEoBToBMRIpChlwZXJtdXRlX3ZhcmlhYmxlX3JhbmRvbWx5GLIBIAEoCDoFZmFsc2USMQohcGVybXV0ZV9wcmVzb2x2ZV9jb25zdHJhaW50X29yZGVyGLMBIAEoCDoFZmFsc2USHwoPdXNlX2Fic2xfcmFuZG9tGLQBIAEoCDoFZmFsc2USIgoTbG9nX3NlYXJjaF9wcm9ncmVzcxgpIAEoCDoFZmFsc2USKAoYbG9nX3N1YnNvbHZlcl9zdGF0aXN0aWNzGL0BIAEoCDoFZmFsc2USFQoKbG9nX3ByZWZpeBi5ASABKAk6ABIcCg1sb2dfdG9fc3Rkb3V0GLoBIAEoCDoEdHJ1ZRIfCg9sb2dfdG9fcmVzcG9uc2UYuwEgASgIOgVmYWxzZRIgChF1c2VfcGJfcmVzb2x1dGlvbhgrIAEoCDoFZmFsc2USNgonbWluaW1pemVfcmVkdWN0aW9uX2R1cmluZ19wYl9yZXNvbHV0aW9uGDAgASgIOgVmYWxzZRIsCh5jb3VudF9hc3N1bXB0aW9uX2xldmVsc19pbl9sYmQYMSABKAg6BHRydWUSIwoWcHJlc29sdmVfYnZlX3RocmVzaG9sZBg2IAEoBToDNTAwEiwKHGZpbHRlcl9zYXRfcG9zdHNvbHZlX2NsYXVzZXMYxAIgASgIOgVmYWxzZRIlChpwcmVzb2x2ZV9idmVfY2xhdXNlX3dlaWdodBg3IAEoBToBMxIsCiBwcm9iaW5nX2RldGVybWluaXN0aWNfdGltZV9saW1pdBjiASABKAE6ATESNQopcHJlc29sdmVfcHJvYmluZ19kZXRlcm1pbmlzdGljX3RpbWVfbGltaXQYOSABKAE6AjMwEiUKF3ByZXNvbHZlX2Jsb2NrZWRfY2xhdXNlGFggASgIOgR0cnVlEh4KEHByZXNvbHZlX3VzZV9idmEYSCABKAg6BHRydWUSIQoWcHJlc29sdmVfYnZhX3RocmVzaG9sZBhJIAEoBToBMRIjChdtYXhfcHJlc29sdmVfaXRlcmF0aW9ucxiKASABKAU6ATMSHwoRY3BfbW9kZWxfcHJlc29sdmUYViABKAg6BHRydWUSIQoWY3BfbW9kZWxfcHJvYmluZ19sZXZlbBhuIAEoBToBMhInChljcF9tb2RlbF91c2Vfc2F0X3ByZXNvbHZlGF0gASgIOgR0cnVlEjEKIWxvYWRfYXRfbW9zdF9vbmVzX2luX3NhdF9wcmVzb2x2ZRjPAiABKAg6BWZhbHNlEisKHHJlbW92ZV9maXhlZF92YXJpYWJsZXNfZWFybHkYtgIgASgIOgR0cnVlEiYKFmRldGVjdF90YWJsZV93aXRoX2Nvc3QY2AEgASgIOgVmYWxzZRIjChd0YWJsZV9jb21wcmVzc2lvbl9sZXZlbBjZASABKAU6ATISKgoaZXhwYW5kX2FsbGRpZmZfY29uc3RyYWludHMYqgEgASgIOgVmYWxzZRIlChdtYXhfYWxsZGlmZl9kb21haW5fc2l6ZRjAAiABKAU6AzI1NhIrChxleHBhbmRfcmVzZXJ2b2lyX2NvbnN0cmFpbnRzGLYBIAEoCDoEdHJ1ZRIxCiVtYXhfZG9tYWluX3NpemVfZm9yX2xpbmVhcjJfZXhwYW5zaW9uGNQCIAEoBToBOBIuCh5leHBhbmRfcmVzZXJ2b2lyX3VzaW5nX2NpcmN1aXQYoAIgASgIOgVmYWxzZRIuCh5lbmNvZGVfY3VtdWxhdGl2ZV9hc19yZXNlcnZvaXIYnwIgASgIOgVmYWxzZRIqCh5tYXhfbGluX21heF9zaXplX2Zvcl9leHBhbnNpb24YmAIgASgFOgEwEiwKHGRpc2FibGVfY29uc3RyYWludF9leHBhbnNpb24YtQEgASgIOgVmYWxzZRI9Ci1lbmNvZGVfY29tcGxleF9saW5lYXJfY29uc3RyYWludF93aXRoX2ludGVnZXIY3wEgASgIOgVmYWxzZRIrChttZXJnZV9ub19vdmVybGFwX3dvcmtfbGltaXQYkQEgASgBOgUxZSsxMhIsChxtZXJnZV9hdF9tb3N0X29uZV93b3JrX2xpbWl0GJIBIAEoAToFMWUrMDgSJwobcHJlc29sdmVfc3Vic3RpdHV0aW9uX2xldmVsGJMBIAEoBToBMRI0CiRwcmVzb2x2ZV9leHRyYWN0X2ludGVnZXJfZW5mb3JjZW1lbnQYrgEgASgIOgVmYWxzZRIxCh1wcmVzb2x2ZV9pbmNsdXNpb25fd29ya19saW1pdBjJASABKAM6CTEwMDAwMDAwMBIbCgxpZ25vcmVfbmFtZXMYygEgASgIOgR0cnVlEh4KD2luZmVyX2FsbF9kaWZmcxjpASABKAg6BHRydWUSJgoXZmluZF9iaWdfbGluZWFyX292ZXJsYXAY6gEgASgIOgR0cnVlEjAKIWZpbmRfY2xhdXNlc190aGF0X2FyZV9leGFjdGx5X29uZRjNAiABKAg6BHRydWUSIwoUdXNlX3NhdF9pbnByb2Nlc3NpbmcYowEgASgIOgR0cnVlEiYKGGlucHJvY2Vzc2luZ19kdGltZV9yYXRpbxiRAiABKAE6AzAuMhImChppbnByb2Nlc3NpbmdfcHJvYmluZ19kdGltZRiSAiABKAE6ATESKwofaW5wcm9jZXNzaW5nX21pbmltaXphdGlvbl9kdGltZRiTAiABKAE6ATESPgovaW5wcm9jZXNzaW5nX21pbmltaXphdGlvbl91c2VfY29uZmxpY3RfYW5hbHlzaXMYqQIgASgIOgR0cnVlEjsKK2lucHJvY2Vzc2luZ19taW5pbWl6YXRpb25fdXNlX2FsbF9vcmRlcmluZ3MYqgIgASgIOgVmYWxzZRIyCiNpbnByb2Nlc3NpbmdfdXNlX2NvbmdydWVuY2VfY2xvc3VyZRjWAiABKAg6BHRydWUSLQodaW5wcm9jZXNzaW5nX3VzZV9zYXRfc3dlZXBpbmcY4gIgASgIOgVmYWxzZRIXCgtudW1fd29ya2VycxjOASABKAU6ATASHQoSbnVtX3NlYXJjaF93b3JrZXJzGGQgASgFOgEwEh8KE251bV9mdWxsX3N1YnNvbHZlcnMYpgIgASgFOgEwEhMKCnN1YnNvbHZlcnMYzwEgAygJEhkKEGV4dHJhX3N1YnNvbHZlcnMY2wEgAygJEhoKEWlnbm9yZV9zdWJzb2x2ZXJzGNEBIAMoCRIaChFmaWx0ZXJfc3Vic29sdmVycxilAiADKAkSQQoQc3Vic29sdmVyX3BhcmFtcxjSASADKAsyJi5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5TYXRQYXJhbWV0ZXJzEiEKEWludGVybGVhdmVfc2VhcmNoGIgBIAEoCDoFZmFsc2USIQoVaW50ZXJsZWF2ZV9iYXRjaF9zaXplGIYBIAEoBToBMBIkChZzaGFyZV9vYmplY3RpdmVfYm91bmRzGHEgASgIOgR0cnVlEiUKF3NoYXJlX2xldmVsX3plcm9fYm91bmRzGHIgASgIOgR0cnVlEiQKFHNoYXJlX2xpbmVhcjJfYm91bmRzGMYCIAEoCDoFZmFsc2USIwoUc2hhcmVfYmluYXJ5X2NsYXVzZXMYywEgASgIOgR0cnVlEiEKEnNoYXJlX2dsdWVfY2xhdXNlcxidAiABKAg6BHRydWUSJgoXbWluaW1pemVfc2hhcmVkX2NsYXVzZXMYrAIgASgIOgR0cnVlEiQKGHNoYXJlX2dsdWVfY2xhdXNlc19kdGltZRjCAiABKAE6ATESIAoQY2hlY2tfbHJhdF9wcm9vZhjYAiABKAg6BWZhbHNlEicKF2NoZWNrX21lcmdlZF9scmF0X3Byb29mGOACIAEoCDoFZmFsc2USIQoRb3V0cHV0X2xyYXRfcHJvb2YY2QIgASgIOgVmYWxzZRIgChBjaGVja19kcmF0X3Byb29mGNoCIAEoCDoFZmFsc2USIQoRb3V0cHV0X2RyYXRfcHJvb2YY2wIgASgIOgVmYWxzZRImChhtYXhfZHJhdF90aW1lX2luX3NlY29uZHMY3AIgASgBOgNpbmYSMAogZGVidWdfcG9zdHNvbHZlX3dpdGhfZnVsbF9zb2x2ZXIYogEgASgIOgVmYWxzZRItCiFkZWJ1Z19tYXhfbnVtX3ByZXNvbHZlX29wZXJhdGlvbnMYlwEgASgFOgEwEicKF2RlYnVnX2NyYXNoX29uX2JhZF9oaW50GMMBIAEoCDoFZmFsc2USMwojZGVidWdfY3Jhc2hfaWZfcHJlc29sdmVfYnJlYWtzX2hpbnQYsgIgASgIOgVmYWxzZRIvCh9kZWJ1Z19jcmFzaF9pZl9scmF0X2NoZWNrX2ZhaWxzGNMCIAEoCDoFZmFsc2USJAoWdXNlX29wdGltaXphdGlvbl9oaW50cxgjIAEoCDoEdHJ1ZRIiChdjb3JlX21pbmltaXphdGlvbl9sZXZlbBgyIAEoBToBMhIhChNmaW5kX211bHRpcGxlX2NvcmVzGFQgASgIOgR0cnVlEiAKEmNvdmVyX29wdGltaXphdGlvbhhZIAEoCDoEdHJ1ZRJ4ChhtYXhfc2F0X2Fzc3VtcHRpb25fb3JkZXIYMyABKA4yPC5vcGVyYXRpb25zX3Jlc2VhcmNoLnNhdC5TYXRQYXJhbWV0ZXJzLk1heFNhdEFzc3VtcHRpb25PcmRlcjoYREVGQVVMVF9BU1NVTVBUSU9OX09SREVSEi8KIG1heF9zYXRfcmV2ZXJzZV9hc3N1bXB0aW9uX29yZGVyGDQgASgIOgVmYWxzZRJ8ChZtYXhfc2F0X3N0cmF0aWZpY2F0aW9uGDUgASgOMkQub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuU2F0UGFyYW1ldGVycy5NYXhTYXRTdHJhdGlmaWNhdGlvbkFsZ29yaXRobToWU1RSQVRJRklDQVRJT05fREVTQ0VOVBIuCiFwcm9wYWdhdGlvbl9sb29wX2RldGVjdGlvbl9mYWN0b3IY3QEgASgBOgIxMBI3Cil1c2VfcHJlY2VkZW5jZXNfaW5fZGlzanVuY3RpdmVfY29uc3RyYWludBhKIAEoCDoEdHJ1ZRIzCiF0cmFuc2l0aXZlX3ByZWNlZGVuY2VzX3dvcmtfbGltaXQYxwIgASgFOgcxMDAwMDAwEkIKNW1heF9zaXplX3RvX2NyZWF0ZV9wcmVjZWRlbmNlX2xpdGVyYWxzX2luX2Rpc2p1bmN0aXZlGOUBIAEoBToCNjASNQoldXNlX3N0cm9uZ19wcm9wYWdhdGlvbl9pbl9kaXNqdW5jdGl2ZRjmASABKAg6BWZhbHNlEjUKJXVzZV9keW5hbWljX3ByZWNlZGVuY2VfaW5fZGlzanVuY3RpdmUYhwIgASgIOgVmYWxzZRI0CiR1c2VfZHluYW1pY19wcmVjZWRlbmNlX2luX2N1bXVsYXRpdmUYjAIgASgIOgVmYWxzZRIxCiJ1c2Vfb3ZlcmxvYWRfY2hlY2tlcl9pbl9jdW11bGF0aXZlGE4gASgIOgVmYWxzZRI3Cid1c2VfY29uc2VydmF0aXZlX3NjYWxlX292ZXJsb2FkX2NoZWNrZXIYngIgASgIOgVmYWxzZRI3Cih1c2VfdGltZXRhYmxlX2VkZ2VfZmluZGluZ19pbl9jdW11bGF0aXZlGE8gASgIOgVmYWxzZRI6CixtYXhfbnVtX2ludGVydmFsc19mb3JfdGltZXRhYmxlX2VkZ2VfZmluZGluZxiEAiABKAU6AzEwMBIyCiJ1c2VfaGFyZF9wcmVjZWRlbmNlc19pbl9jdW11bGF0aXZlGNcBIAEoCDoFZmFsc2USJwoXZXhwbG9pdF9hbGxfcHJlY2VkZW5jZXMY3AEgASgIOgVmYWxzZRI2Cih1c2VfZGlzanVuY3RpdmVfY29uc3RyYWludF9pbl9jdW11bGF0aXZlGFAgASgIOgR0cnVlEjIKJW5vX292ZXJsYXBfMmRfYm9vbGVhbl9yZWxhdGlvbnNfbGltaXQYwQIgASgFOgIxMBIwCiB1c2VfdGltZXRhYmxpbmdfaW5fbm9fb3ZlcmxhcF8yZBjIASABKAg6BWZhbHNlEjgKKHVzZV9lbmVyZ2V0aWNfcmVhc29uaW5nX2luX25vX292ZXJsYXBfMmQY1QEgASgIOgVmYWxzZRI9Ci11c2VfYXJlYV9lbmVyZ2V0aWNfcmVhc29uaW5nX2luX25vX292ZXJsYXBfMmQYjwIgASgIOgVmYWxzZRI3Cid1c2VfdHJ5X2VkZ2VfcmVhc29uaW5nX2luX25vX292ZXJsYXBfMmQYqwIgASgIOgVmYWxzZRI8Ci1tYXhfcGFpcnNfcGFpcndpc2VfcmVhc29uaW5nX2luX25vX292ZXJsYXBfMmQYlAIgASgFOgQxMjUwEkIKNm1heGltdW1fcmVnaW9uc190b19zcGxpdF9pbl9kaXNjb25uZWN0ZWRfbm9fb3ZlcmxhcF8yZBi7AiABKAU6ATASOAopdXNlX2xpbmVhcjNfZm9yX25vX292ZXJsYXBfMmRfcHJlY2VkZW5jZXMYwwIgASgIOgR0cnVlEi0KHnVzZV9kdWFsX3NjaGVkdWxpbmdfaGV1cmlzdGljcxjWASABKAg6BHRydWUSLQoddXNlX2FsbF9kaWZmZXJlbnRfZm9yX2NpcmN1aXQYtwIgASgIOgVmYWxzZRI9CjFyb3V0aW5nX2N1dF9zdWJzZXRfc2l6ZV9mb3JfYmluYXJ5X3JlbGF0aW9uX2JvdW5kGLgCIAEoBToBMBJDCjdyb3V0aW5nX2N1dF9zdWJzZXRfc2l6ZV9mb3JfdGlnaHRfYmluYXJ5X3JlbGF0aW9uX2JvdW5kGLkCIAEoBToBMBJDCjdyb3V0aW5nX2N1dF9zdWJzZXRfc2l6ZV9mb3JfZXhhY3RfYmluYXJ5X3JlbGF0aW9uX2JvdW5kGLwCIAEoBToBOBI8CjByb3V0aW5nX2N1dF9zdWJzZXRfc2l6ZV9mb3Jfc2hvcnRlc3RfcGF0aHNfYm91bmQYvgIgASgFOgE4EiUKFXJvdXRpbmdfY3V0X2RwX2VmZm9ydBi6AiABKAE6BTFlKzA3EjIKJnJvdXRpbmdfY3V0X21heF9pbmZlYXNpYmxlX3BhdGhfbGVuZ3RoGL0CIAEoBToBNhJiChBzZWFyY2hfYnJhbmNoaW5nGFIgASgOMjYub3BlcmF0aW9uc19yZXNlYXJjaC5zYXQuU2F0UGFyYW1ldGVycy5TZWFyY2hCcmFuY2hpbmc6EEFVVE9NQVRJQ19TRUFSQ0gSIAoTaGludF9jb25mbGljdF9saW1pdBiZASABKAU6AjEwEhsKC3JlcGFpcl9oaW50GKcBIAEoCDoFZmFsc2USMwojZml4X3ZhcmlhYmxlc190b190aGVpcl9oaW50ZWRfdmFsdWUYwAEgASgIOgVmYWxzZRIiChJ1c2VfcHJvYmluZ19zZWFyY2gYsAEgASgIOgVmYWxzZRIjChR1c2VfZXh0ZW5kZWRfcHJvYmluZxiNAiABKAg6BHRydWUSLgoecHJvYmluZ19udW1fY29tYmluYXRpb25zX2xpbWl0GJACIAEoBToFMjAwMDASPAosc2hhdmluZ19kZXRlcm1pbmlzdGljX3RpbWVfaW5fcHJvYmluZ19zZWFyY2gYzAEgASgBOgUwLjAwMRIvCiFzaGF2aW5nX3NlYXJjaF9kZXRlcm1pbmlzdGljX3RpbWUYzQEgASgBOgMwLjESJQoYc2hhdmluZ19zZWFyY2hfdGhyZXNob2xkGKICIAEoAzoCNjQSJwoXdXNlX29iamVjdGl2ZV9sYl9zZWFyY2gY5AEgASgIOgVmYWxzZRIsChx1c2Vfb2JqZWN0aXZlX3NoYXZpbmdfc2VhcmNoGP0BIAEoCDoFZmFsc2USJAoXdmFyaWFibGVzX3NoYXZpbmdfbGV2ZWwYoQIgASgFOgItMRIuCiFwc2V1ZG9fY29zdF9yZWxpYWJpbGl0eV90aHJlc2hvbGQYeyABKAM6AzEwMBIhChJvcHRpbWl6ZV93aXRoX2NvcmUYUyABKAg6BWZhbHNlEiwKHG9wdGltaXplX3dpdGhfbGJfdHJlZV9zZWFyY2gYvAEgASgIOgVmYWxzZRIvCh9zYXZlX2xwX2Jhc2lzX2luX2xiX3RyZWVfc2VhcmNoGJwCIAEoCDoFZmFsc2USJwobYmluYXJ5X3NlYXJjaF9udW1fY29uZmxpY3RzGGMgASgFOgItMRIjChRvcHRpbWl6ZV93aXRoX21heF9ocxhVIAEoCDoFZmFsc2USIwoUdXNlX2ZlYXNpYmlsaXR5X2p1bXAYiQIgASgIOgR0cnVlEhsKC3VzZV9sc19vbmx5GPABIAEoCDoFZmFsc2USJQoWZmVhc2liaWxpdHlfanVtcF9kZWNheRjyASABKAE6BDAuOTUSMAokZmVhc2liaWxpdHlfanVtcF9saW5lYXJpemF0aW9uX2xldmVsGIECIAEoBToBMhIrCh9mZWFzaWJpbGl0eV9qdW1wX3Jlc3RhcnRfZmFjdG9yGIICIAEoBToBMRIqChxmZWFzaWJpbGl0eV9qdW1wX2JhdGNoX2R0aW1lGKQCIAEoAToDMC4xEj0KLmZlYXNpYmlsaXR5X2p1bXBfdmFyX3JhbmRvbWl6YXRpb25fcHJvYmFiaWxpdHkY9wEgASgBOgQwLjA1EjsKLWZlYXNpYmlsaXR5X2p1bXBfdmFyX3BlcmJ1cmJhdGlvbl9yYW5nZV9yYXRpbxj4ASABKAE6AzAuMhIvCiBmZWFzaWJpbGl0eV9qdW1wX2VuYWJsZV9yZXN0YXJ0cxj6ASABKAg6BHRydWUSOwotZmVhc2liaWxpdHlfanVtcF9tYXhfZXhwYW5kZWRfY29uc3RyYWludF9zaXplGIgCIAEoBToDNTAwEhwKEG51bV92aW9sYXRpb25fbHMY9AEgASgFOgEwEi4KIHZpb2xhdGlvbl9sc19wZXJ0dXJiYXRpb25fcGVyaW9kGPkBIAEoBToDMTAwEjQKJnZpb2xhdGlvbl9sc19jb21wb3VuZF9tb3ZlX3Byb2JhYmlsaXR5GIMCIAEoAToDMC41EiQKF3NoYXJlZF90cmVlX251bV93b3JrZXJzGOsBIAEoBToCLTESJgoWdXNlX3NoYXJlZF90cmVlX3NlYXJjaBjsASABKAg6BWZhbHNlEjcKK3NoYXJlZF90cmVlX3dvcmtlcl9taW5fcmVzdGFydHNfcGVyX3N1YnRyZWUYmgIgASgFOgExEjYKJ3NoYXJlZF90cmVlX3dvcmtlcl9lbmFibGVfdHJhaWxfc2hhcmluZxinAiABKAg6BHRydWUSNgonc2hhcmVkX3RyZWVfd29ya2VyX2VuYWJsZV9waGFzZV9zaGFyaW5nGLACIAEoCDoEdHJ1ZRIuCiJzaGFyZWRfdHJlZV9vcGVuX2xlYXZlc19wZXJfd29ya2VyGJkCIAEoAToBMhIwCiBzaGFyZWRfdHJlZV9tYXhfbm9kZXNfcGVyX3dvcmtlchjuASABKAU6BTEwMDAwEngKGnNoYXJlZF90cmVlX3NwbGl0X3N0cmF0ZWd5GO8BIAEoDjI+Lm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LlNhdFBhcmFtZXRlcnMuU2hhcmVkVHJlZVNwbGl0U3RyYXRlZ3k6E1NQTElUX1NUUkFURUdZX0FVVE8SKQodc2hhcmVkX3RyZWVfYmFsYW5jZV90b2xlcmFuY2UYsQIgASgFOgExEikKG3NoYXJlZF90cmVlX3NwbGl0X21pbl9kdGltZRjIAiABKAE6AzAuMRImChdlbnVtZXJhdGVfYWxsX3NvbHV0aW9ucxhXIAEoCDoFZmFsc2USNwona2VlcF9hbGxfZmVhc2libGVfc29sdXRpb25zX2luX3ByZXNvbHZlGK0BIAEoCDoFZmFsc2USMgoiZmlsbF90aWdodGVuZWRfZG9tYWluc19pbl9yZXNwb25zZRiEASABKAg6BWZhbHNlEjUKJWZpbGxfYWRkaXRpb25hbF9zb2x1dGlvbnNfaW5fcmVzcG9uc2UYwgEgASgIOgVmYWxzZRInChlpbnN0YW50aWF0ZV9hbGxfdmFyaWFibGVzGGogASgIOgR0cnVlEjYKKGF1dG9fZGV0ZWN0X2dyZWF0ZXJfdGhhbl9hdF9sZWFzdF9vbmVfb2YYXyABKAg6BHRydWUSKAoZc3RvcF9hZnRlcl9maXJzdF9zb2x1dGlvbhhiIAEoCDoFZmFsc2USIwoTc3RvcF9hZnRlcl9wcmVzb2x2ZRiVASABKAg6BWZhbHNlEisKG3N0b3BfYWZ0ZXJfcm9vdF9wcm9wYWdhdGlvbhj8ASABKAg6BWZhbHNlEiQKFmxuc19pbml0aWFsX2RpZmZpY3VsdHkYswIgASgBOgMwLjUSLQofbG5zX2luaXRpYWxfZGV0ZXJtaW5pc3RpY19saW1pdBi0AiABKAE6AzAuMRIWCgd1c2VfbG5zGJsCIAEoCDoEdHJ1ZRIbCgx1c2VfbG5zX29ubHkYZSABKAg6BWZhbHNlEh4KEnNvbHV0aW9uX3Bvb2xfc2l6ZRjBASABKAU6ATMSKgodc29sdXRpb25fcG9vbF9kaXZlcnNpdHlfbGltaXQYyQIgASgFOgIxMBIhChVhbHRlcm5hdGl2ZV9wb29sX3NpemUYxQIgASgFOgExEhsKDHVzZV9yaW5zX2xucxiBASABKAg6BHRydWUSIwoUdXNlX2ZlYXNpYmlsaXR5X3B1bXAYpAEgASgIOgR0cnVlEh8KEHVzZV9sYl9yZWxheF9sbnMY/wEgASgIOgR0cnVlEisKHmxiX3JlbGF4X251bV93b3JrZXJzX3RocmVzaG9sZBioAiABKAU6AjE2EmMKC2ZwX3JvdW5kaW5nGKUBIAEoDjI3Lm9wZXJhdGlvbnNfcmVzZWFyY2guc2F0LlNhdFBhcmFtZXRlcnMuRlBSb3VuZGluZ01ldGhvZDoUUFJPUEFHQVRJT05fQVNTSVNURUQSJAoUZGl2ZXJzaWZ5X2xuc19wYXJhbXMYiQEgASgIOgVmYWxzZRIfChByYW5kb21pemVfc2VhcmNoGGcgASgIOgVmYWxzZRIrCiBzZWFyY2hfcmFuZG9tX3ZhcmlhYmxlX3Bvb2xfc2l6ZRhoIAEoAzoBMBIrChtwdXNoX2FsbF90YXNrc190b3dhcmRfc3RhcnQYhgIgASgIOgVmYWxzZRIlChZ1c2Vfb3B0aW9uYWxfdmFyaWFibGVzGGwgASgIOgVmYWxzZRIhChN1c2VfZXhhY3RfbHBfcmVhc29uGG0gASgIOgR0cnVlEicKF3VzZV9jb21iaW5lZF9ub19vdmVybGFwGIUBIAEoCDoFZmFsc2USKgoeYXRfbW9zdF9vbmVfbWF4X2V4cGFuc2lvbl9zaXplGI4CIAEoBToBMxIiChNjYXRjaF9zaWdpbnRfc2lnbmFsGIcBIAEoCDoEdHJ1ZRIhChJ1c2VfaW1wbGllZF9ib3VuZHMYkAEgASgIOgR0cnVlEiIKEnBvbGlzaF9scF9zb2x1dGlvbhivASABKAg6BWZhbHNlEiMKE2xwX3ByaW1hbF90b2xlcmFuY2UYigIgASgBOgUxZS0wNxIhChFscF9kdWFsX3RvbGVyYW5jZRiLAiABKAE6BTFlLTA3EiAKEWNvbnZlcnRfaW50ZXJ2YWxzGLEBIAEoCDoEdHJ1ZRIaCg5zeW1tZXRyeV9sZXZlbBi3ASABKAU6ATISIgoSdXNlX3N5bW1ldHJ5X2luX2xwGK0CIAEoCDoFZmFsc2USKQoZa2VlcF9zeW1tZXRyeV9pbl9wcmVzb2x2ZRivAiABKAg6BWZhbHNlEjcKK3N5bW1ldHJ5X2RldGVjdGlvbl9kZXRlcm1pbmlzdGljX3RpbWVfbGltaXQYrgIgASgBOgExEiUKFm5ld19saW5lYXJfcHJvcGFnYXRpb24Y4AEgASgIOgR0cnVlEh8KEWxpbmVhcl9zcGxpdF9zaXplGIACIAEoBToDMTAwEh4KE2xpbmVhcml6YXRpb25fbGV2ZWwYWiABKAU6ATESIQoWYm9vbGVhbl9lbmNvZGluZ19sZXZlbBhrIAEoBToBMRI9CjBtYXhfZG9tYWluX3NpemVfd2hlbl9lbmNvZGluZ19lcV9uZXFfY29uc3RyYWludHMYvwEgASgFOgIxNhIbCgxtYXhfbnVtX2N1dHMYWyABKAU6BTEwMDAwEhUKCWN1dF9sZXZlbBjEASABKAU6ATESKgobb25seV9hZGRfY3V0c19hdF9sZXZlbF96ZXJvGFwgASgIOgVmYWxzZRIhChFhZGRfb2JqZWN0aXZlX2N1dBjFASABKAg6BWZhbHNlEhkKC2FkZF9jZ19jdXRzGHUgASgIOgR0cnVlEhoKDGFkZF9taXJfY3V0cxh4IAEoCDoEdHJ1ZRIhChJhZGRfemVyb19oYWxmX2N1dHMYqQEgASgIOgR0cnVlEh4KD2FkZF9jbGlxdWVfY3V0cxisASABKAg6BHRydWUSGwoMYWRkX3JsdF9jdXRzGJcCIAEoCDoEdHJ1ZRIiChVtYXhfYWxsX2RpZmZfY3V0X3NpemUYlAEgASgFOgI2NBIfChBhZGRfbGluX21heF9jdXRzGJgBIAEoCDoEdHJ1ZRIpChxtYXhfaW50ZWdlcl9yb3VuZGluZ19zY2FsaW5nGHcgASgFOgM2MDASJwoZYWRkX2xwX2NvbnN0cmFpbnRzX2xhemlseRhwIAEoCDoEdHJ1ZRIhChJyb290X2xwX2l0ZXJhdGlvbnMY4wEgASgFOgQyMDAwEjIKJG1pbl9vcnRob2dvbmFsaXR5X2Zvcl9scF9jb25zdHJhaW50cxhzIAEoAToEMC4wNRIoChxtYXhfY3V0X3JvdW5kc19hdF9sZXZlbF96ZXJvGJoBIAEoBToBMRIrCh5tYXhfY29uc2VjdXRpdmVfaW5hY3RpdmVfY291bnQYeSABKAU6AzEwMBIqChpjdXRfbWF4X2FjdGl2ZV9jb3VudF92YWx1ZRibASABKAE6BTFlKzEwEiQKFmN1dF9hY3RpdmVfY291bnRfZGVjYXkYnAEgASgBOgMwLjgSIQoSY3V0X2NsZWFudXBfdGFyZ2V0GJ0BIAEoBToEMTAwMBImChpuZXdfY29uc3RyYWludHNfYmF0Y2hfc2l6ZRh6IAEoBToCNTASKQobZXhwbG9pdF9pbnRlZ2VyX2xwX3NvbHV0aW9uGF4gASgIOgR0cnVlEiUKF2V4cGxvaXRfYWxsX2xwX3NvbHV0aW9uGHQgASgIOgR0cnVlEiUKFWV4cGxvaXRfYmVzdF9zb2x1dGlvbhiCASABKAg6BWZhbHNlEisKG2V4cGxvaXRfcmVsYXhhdGlvbl9zb2x1dGlvbhihASABKAg6BWZhbHNlEiAKEWV4cGxvaXRfb2JqZWN0aXZlGIMBIAEoCDoEdHJ1ZRIpChlkZXRlY3RfbGluZWFyaXplZF9wcm9kdWN0GJUCIAEoCDoFZmFsc2USMwojdXNlX25ld19pbnRlZ2VyX2NvbmZsaWN0X3Jlc29sdXRpb24Y0AIgASgIOgVmYWxzZRItCh5jcmVhdGVfMXVpcF9ib29sZWFuX2R1cmluZ19pY3IY1QIgASgIOgR0cnVlEhwKDW1pcF9tYXhfYm91bmQYfCABKAE6BTFlKzA3EhoKD21pcF92YXJfc2NhbGluZxh9IAEoAToBMRImChZtaXBfc2NhbGVfbGFyZ2VfZG9tYWluGOEBIAEoCDoFZmFsc2USMAohbWlwX2F1dG9tYXRpY2FsbHlfc2NhbGVfdmFyaWFibGVzGKYBIAEoCDoEdHJ1ZRIdCg1vbmx5X3NvbHZlX2lwGN4BIAEoCDoFZmFsc2USIwoUbWlwX3dhbnRlZF9wcmVjaXNpb24YfiABKAE6BTFlLTA2EiUKGW1pcF9tYXhfYWN0aXZpdHlfZXhwb25lbnQYfyABKAU6AjUzEiQKE21pcF9jaGVja19wcmVjaXNpb24YgAEgASgBOgYwLjAwMDESLwogbWlwX2NvbXB1dGVfdHJ1ZV9vYmplY3RpdmVfYm91bmQYxgEgASgIOgR0cnVlEicKF21pcF9tYXhfdmFsaWRfbWFnbml0dWRlGMcBIAEoAToFMWUrMjASOworbWlwX3RyZWF0X2hpZ2hfbWFnbml0dWRlX2JvdW5kc19hc19pbmZpbml0eRiWAiABKAg6BWZhbHNlEiIKEm1pcF9kcm9wX3RvbGVyYW5jZRjoASABKAE6BTFlLTE2Eh4KEm1pcF9wcmVzb2x2ZV9sZXZlbBiFAiABKAU6ATIiSAoNVmFyaWFibGVPcmRlchIMCghJTl9PUkRFUhAAEhQKEElOX1JFVkVSU0VfT1JERVIQARITCg9JTl9SQU5ET01fT1JERVIQAiJGCghQb2xhcml0eRIRCg1QT0xBUklUWV9UUlVFEAASEgoOUE9MQVJJVFlfRkFMU0UQARITCg9QT0xBUklUWV9SQU5ET00QAiJKCh1Db25mbGljdE1pbmltaXphdGlvbkFsZ29yaXRobRIICgROT05FEAASCgoGU0lNUExFEAESDQoJUkVDVVJTSVZFEAIiBAgDEAMimwEKGUJpbmFyeU1pbml6YXRpb25BbGdvcml0aG0SGgoWTk9fQklOQVJZX01JTklNSVpBVElPThAAEiAKHEJJTkFSWV9NSU5JTUlaQVRJT05fRlJPTV9VSVAQARIuCipCSU5BUllfTUlOSU1JWkFUSU9OX0ZST01fVUlQX0FORF9ERUNJU0lPTlMQBSIECAIQAiIECAMQAyIECAQQBCI1Cg5DbGF1c2VPcmRlcmluZxITCg9DTEFVU0VfQUNUSVZJVFkQABIOCgpDTEFVU0VfTEJEEAEihgEKEFJlc3RhcnRBbGdvcml0aG0SDgoKTk9fUkVTVEFSVBAAEhAKDExVQllfUkVTVEFSVBABEh0KGURMX01PVklOR19BVkVSQUdFX1JFU1RBUlQQAhIeChpMQkRfTU9WSU5HX0FWRVJBR0VfUkVTVEFSVBADEhEKDUZJWEVEX1JFU1RBUlQQBCJ0ChVNYXhTYXRBc3N1bXB0aW9uT3JkZXISHAoYREVGQVVMVF9BU1NVTVBUSU9OX09SREVSEAASHQoZT1JERVJfQVNTVU1QVElPTl9CWV9ERVBUSBABEh4KGk9SREVSX0FTU1VNUFRJT05fQllfV0VJR0hUEAIibwodTWF4U2F0U3RyYXRpZmljYXRpb25BbGdvcml0aG0SFwoTU1RSQVRJRklDQVRJT05fTk9ORRAAEhoKFlNUUkFUSUZJQ0FUSU9OX0RFU0NFTlQQARIZChVTVFJBVElGSUNBVElPTl9BU0NFTlQQAiLhAQoPU2VhcmNoQnJhbmNoaW5nEhQKEEFVVE9NQVRJQ19TRUFSQ0gQABIQCgxGSVhFRF9TRUFSQ0gQARIUChBQT1JURk9MSU9fU0VBUkNIEAISDQoJTFBfU0VBUkNIEAMSFgoSUFNFVURPX0NPU1RfU0VBUkNIEAQSJwojUE9SVEZPTElPX1dJVEhfUVVJQ0tfUkVTVEFSVF9TRUFSQ0gQBRIPCgtISU5UX1NFQVJDSBAGEhgKFFBBUlRJQUxfRklYRURfU0VBUkNIEAcSFQoRUkFORE9NSVpFRF9TRUFSQ0gQCCK4AQoXU2hhcmVkVHJlZVNwbGl0U3RyYXRlZ3kSFwoTU1BMSVRfU1RSQVRFR1lfQVVUTxAAEh4KGlNQTElUX1NUUkFURUdZX0RJU0NSRVBBTkNZEAESHwobU1BMSVRfU1RSQVRFR1lfT0JKRUNUSVZFX0xCEAISIAocU1BMSVRfU1RSQVRFR1lfQkFMQU5DRURfVFJFRRADEiEKHVNQTElUX1NUUkFURUdZX0ZJUlNUX1BST1BPU0FMEAQiaAoQRlBSb3VuZGluZ01ldGhvZBITCg9ORUFSRVNUX0lOVEVHRVIQABIOCgpMT0NLX0JBU0VEEAESFQoRQUNUSVZFX0xPQ0tfQkFTRUQQAxIYChRQUk9QQUdBVElPTl9BU1NJU1RFRBACQmsKFmNvbS5nb29nbGUub3J0b29scy5zYXRQAVo6Z2l0aHViLmNvbS9nb29nbGUvb3ItdG9vbHMvb3J0b29scy9zYXQvcHJvdG8vc2F0cGFyYW1ldGVyc6oCEkdvb2dsZS5PclRvb2xzLlNhdA");
/**
 * Describes the message operations_research.sat.SatParameters.
 * Use `create(SatParametersSchema)` to create a new message.
 */
export const SatParametersSchema = /*@__PURE__*/ messageDesc(file_sat_parameters, 0);
/**
 * Variables without activity (i.e. at the beginning of the search) will be
 * tried in this preferred order.
 *
 * @generated from enum operations_research.sat.SatParameters.VariableOrder
 */
export var SatParameters_VariableOrder;
(function (SatParameters_VariableOrder) {
    /**
     * As specified by the problem.
     *
     * @generated from enum value: IN_ORDER = 0;
     */
    SatParameters_VariableOrder[SatParameters_VariableOrder["IN_ORDER"] = 0] = "IN_ORDER";
    /**
     * @generated from enum value: IN_REVERSE_ORDER = 1;
     */
    SatParameters_VariableOrder[SatParameters_VariableOrder["IN_REVERSE_ORDER"] = 1] = "IN_REVERSE_ORDER";
    /**
     * @generated from enum value: IN_RANDOM_ORDER = 2;
     */
    SatParameters_VariableOrder[SatParameters_VariableOrder["IN_RANDOM_ORDER"] = 2] = "IN_RANDOM_ORDER";
})(SatParameters_VariableOrder || (SatParameters_VariableOrder = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.VariableOrder.
 */
export const SatParameters_VariableOrderSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 0);
/**
 * Specifies the initial polarity (true/false) when the solver branches on a
 * variable. This can be modified later by the user, or the phase saving
 * heuristic.
 *
 * Note(user): POLARITY_FALSE is usually a good choice because of the
 * "natural" way to express a linear boolean problem.
 *
 * @generated from enum operations_research.sat.SatParameters.Polarity
 */
export var SatParameters_Polarity;
(function (SatParameters_Polarity) {
    /**
     * @generated from enum value: POLARITY_TRUE = 0;
     */
    SatParameters_Polarity[SatParameters_Polarity["TRUE"] = 0] = "TRUE";
    /**
     * @generated from enum value: POLARITY_FALSE = 1;
     */
    SatParameters_Polarity[SatParameters_Polarity["FALSE"] = 1] = "FALSE";
    /**
     * @generated from enum value: POLARITY_RANDOM = 2;
     */
    SatParameters_Polarity[SatParameters_Polarity["RANDOM"] = 2] = "RANDOM";
})(SatParameters_Polarity || (SatParameters_Polarity = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.Polarity.
 */
export const SatParameters_PolaritySchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 1);
/**
 * Do we try to minimize conflicts (greedily) when creating them.
 *
 * @generated from enum operations_research.sat.SatParameters.ConflictMinimizationAlgorithm
 */
export var SatParameters_ConflictMinimizationAlgorithm;
(function (SatParameters_ConflictMinimizationAlgorithm) {
    /**
     * @generated from enum value: NONE = 0;
     */
    SatParameters_ConflictMinimizationAlgorithm[SatParameters_ConflictMinimizationAlgorithm["NONE"] = 0] = "NONE";
    /**
     * @generated from enum value: SIMPLE = 1;
     */
    SatParameters_ConflictMinimizationAlgorithm[SatParameters_ConflictMinimizationAlgorithm["SIMPLE"] = 1] = "SIMPLE";
    /**
     * @generated from enum value: RECURSIVE = 2;
     */
    SatParameters_ConflictMinimizationAlgorithm[SatParameters_ConflictMinimizationAlgorithm["RECURSIVE"] = 2] = "RECURSIVE";
})(SatParameters_ConflictMinimizationAlgorithm || (SatParameters_ConflictMinimizationAlgorithm = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.ConflictMinimizationAlgorithm.
 */
export const SatParameters_ConflictMinimizationAlgorithmSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 2);
/**
 * Whether to expoit the binary clause to minimize learned clauses further.
 *
 * @generated from enum operations_research.sat.SatParameters.BinaryMinizationAlgorithm
 */
export var SatParameters_BinaryMinizationAlgorithm;
(function (SatParameters_BinaryMinizationAlgorithm) {
    /**
     * @generated from enum value: NO_BINARY_MINIMIZATION = 0;
     */
    SatParameters_BinaryMinizationAlgorithm[SatParameters_BinaryMinizationAlgorithm["NO_BINARY_MINIMIZATION"] = 0] = "NO_BINARY_MINIMIZATION";
    /**
     * @generated from enum value: BINARY_MINIMIZATION_FROM_UIP = 1;
     */
    SatParameters_BinaryMinizationAlgorithm[SatParameters_BinaryMinizationAlgorithm["BINARY_MINIMIZATION_FROM_UIP"] = 1] = "BINARY_MINIMIZATION_FROM_UIP";
    /**
     * @generated from enum value: BINARY_MINIMIZATION_FROM_UIP_AND_DECISIONS = 5;
     */
    SatParameters_BinaryMinizationAlgorithm[SatParameters_BinaryMinizationAlgorithm["BINARY_MINIMIZATION_FROM_UIP_AND_DECISIONS"] = 5] = "BINARY_MINIMIZATION_FROM_UIP_AND_DECISIONS";
})(SatParameters_BinaryMinizationAlgorithm || (SatParameters_BinaryMinizationAlgorithm = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.BinaryMinizationAlgorithm.
 */
export const SatParameters_BinaryMinizationAlgorithmSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 3);
/**
 * The clauses that will be kept during a cleanup are the ones that come
 * first under this order. We always keep or exclude ties together.
 *
 * @generated from enum operations_research.sat.SatParameters.ClauseOrdering
 */
export var SatParameters_ClauseOrdering;
(function (SatParameters_ClauseOrdering) {
    /**
     * Order clause by decreasing activity, then by increasing LBD.
     *
     * @generated from enum value: CLAUSE_ACTIVITY = 0;
     */
    SatParameters_ClauseOrdering[SatParameters_ClauseOrdering["CLAUSE_ACTIVITY"] = 0] = "CLAUSE_ACTIVITY";
    /**
     * Order clause by increasing LBD, then by decreasing activity.
     *
     * @generated from enum value: CLAUSE_LBD = 1;
     */
    SatParameters_ClauseOrdering[SatParameters_ClauseOrdering["CLAUSE_LBD"] = 1] = "CLAUSE_LBD";
})(SatParameters_ClauseOrdering || (SatParameters_ClauseOrdering = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.ClauseOrdering.
 */
export const SatParameters_ClauseOrderingSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 4);
/**
 * Restart algorithms.
 *
 * A reference for the more advanced ones is:
 * Gilles Audemard, Laurent Simon, "Refining Restarts Strategies for SAT
 * and UNSAT", Principles and Practice of Constraint Programming Lecture
 * Notes in Computer Science 2012, pp 118-126
 *
 * @generated from enum operations_research.sat.SatParameters.RestartAlgorithm
 */
export var SatParameters_RestartAlgorithm;
(function (SatParameters_RestartAlgorithm) {
    /**
     * @generated from enum value: NO_RESTART = 0;
     */
    SatParameters_RestartAlgorithm[SatParameters_RestartAlgorithm["NO_RESTART"] = 0] = "NO_RESTART";
    /**
     * Just follow a Luby sequence times restart_period.
     *
     * @generated from enum value: LUBY_RESTART = 1;
     */
    SatParameters_RestartAlgorithm[SatParameters_RestartAlgorithm["LUBY_RESTART"] = 1] = "LUBY_RESTART";
    /**
     * Moving average restart based on the decision level of conflicts.
     *
     * @generated from enum value: DL_MOVING_AVERAGE_RESTART = 2;
     */
    SatParameters_RestartAlgorithm[SatParameters_RestartAlgorithm["DL_MOVING_AVERAGE_RESTART"] = 2] = "DL_MOVING_AVERAGE_RESTART";
    /**
     * Moving average restart based on the LBD of conflicts.
     *
     * @generated from enum value: LBD_MOVING_AVERAGE_RESTART = 3;
     */
    SatParameters_RestartAlgorithm[SatParameters_RestartAlgorithm["LBD_MOVING_AVERAGE_RESTART"] = 3] = "LBD_MOVING_AVERAGE_RESTART";
    /**
     * Fixed period restart every restart period.
     *
     * @generated from enum value: FIXED_RESTART = 4;
     */
    SatParameters_RestartAlgorithm[SatParameters_RestartAlgorithm["FIXED_RESTART"] = 4] = "FIXED_RESTART";
})(SatParameters_RestartAlgorithm || (SatParameters_RestartAlgorithm = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.RestartAlgorithm.
 */
export const SatParameters_RestartAlgorithmSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 5);
/**
 * In what order do we add the assumptions in a core-based max-sat algorithm
 *
 * @generated from enum operations_research.sat.SatParameters.MaxSatAssumptionOrder
 */
export var SatParameters_MaxSatAssumptionOrder;
(function (SatParameters_MaxSatAssumptionOrder) {
    /**
     * @generated from enum value: DEFAULT_ASSUMPTION_ORDER = 0;
     */
    SatParameters_MaxSatAssumptionOrder[SatParameters_MaxSatAssumptionOrder["DEFAULT_ASSUMPTION_ORDER"] = 0] = "DEFAULT_ASSUMPTION_ORDER";
    /**
     * @generated from enum value: ORDER_ASSUMPTION_BY_DEPTH = 1;
     */
    SatParameters_MaxSatAssumptionOrder[SatParameters_MaxSatAssumptionOrder["ORDER_ASSUMPTION_BY_DEPTH"] = 1] = "ORDER_ASSUMPTION_BY_DEPTH";
    /**
     * @generated from enum value: ORDER_ASSUMPTION_BY_WEIGHT = 2;
     */
    SatParameters_MaxSatAssumptionOrder[SatParameters_MaxSatAssumptionOrder["ORDER_ASSUMPTION_BY_WEIGHT"] = 2] = "ORDER_ASSUMPTION_BY_WEIGHT";
})(SatParameters_MaxSatAssumptionOrder || (SatParameters_MaxSatAssumptionOrder = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.MaxSatAssumptionOrder.
 */
export const SatParameters_MaxSatAssumptionOrderSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 6);
/**
 * What stratification algorithm we use in the presence of weight.
 *
 * @generated from enum operations_research.sat.SatParameters.MaxSatStratificationAlgorithm
 */
export var SatParameters_MaxSatStratificationAlgorithm;
(function (SatParameters_MaxSatStratificationAlgorithm) {
    /**
     * No stratification of the problem.
     *
     * @generated from enum value: STRATIFICATION_NONE = 0;
     */
    SatParameters_MaxSatStratificationAlgorithm[SatParameters_MaxSatStratificationAlgorithm["STRATIFICATION_NONE"] = 0] = "STRATIFICATION_NONE";
    /**
     * Start with literals with the highest weight, and when SAT, add the
     * literals with the next highest weight and so on.
     *
     * @generated from enum value: STRATIFICATION_DESCENT = 1;
     */
    SatParameters_MaxSatStratificationAlgorithm[SatParameters_MaxSatStratificationAlgorithm["STRATIFICATION_DESCENT"] = 1] = "STRATIFICATION_DESCENT";
    /**
     * Start with all literals. Each time a core is found with a given minimum
     * weight, do not consider literals with a lower weight for the next core
     * computation. If the subproblem is SAT, do like in STRATIFICATION_DESCENT
     * and just add the literals with the next highest weight.
     *
     * @generated from enum value: STRATIFICATION_ASCENT = 2;
     */
    SatParameters_MaxSatStratificationAlgorithm[SatParameters_MaxSatStratificationAlgorithm["STRATIFICATION_ASCENT"] = 2] = "STRATIFICATION_ASCENT";
})(SatParameters_MaxSatStratificationAlgorithm || (SatParameters_MaxSatStratificationAlgorithm = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.MaxSatStratificationAlgorithm.
 */
export const SatParameters_MaxSatStratificationAlgorithmSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 7);
/**
 * The search branching will be used to decide how to branch on unfixed nodes.
 *
 * @generated from enum operations_research.sat.SatParameters.SearchBranching
 */
export var SatParameters_SearchBranching;
(function (SatParameters_SearchBranching) {
    /**
     * Try to fix all literals using the underlying SAT solver's heuristics,
     * then generate and fix literals until integer variables are fixed. New
     * literals on integer variables are generated using the fixed search
     * specified by the user or our default one.
     *
     * @generated from enum value: AUTOMATIC_SEARCH = 0;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["AUTOMATIC_SEARCH"] = 0] = "AUTOMATIC_SEARCH";
    /**
     * If used then all decisions taken by the solver are made using a fixed
     * order as specified in the API or in the CpModelProto search_strategy
     * field.
     *
     * @generated from enum value: FIXED_SEARCH = 1;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["FIXED_SEARCH"] = 1] = "FIXED_SEARCH";
    /**
     * Simple portfolio search used by LNS workers.
     *
     * @generated from enum value: PORTFOLIO_SEARCH = 2;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["PORTFOLIO_SEARCH"] = 2] = "PORTFOLIO_SEARCH";
    /**
     * If used, the solver will use heuristics from the LP relaxation. This
     * exploit the reduced costs of the variables in the relaxation.
     *
     * @generated from enum value: LP_SEARCH = 3;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["LP_SEARCH"] = 3] = "LP_SEARCH";
    /**
     * If used, the solver uses the pseudo costs for branching. Pseudo costs
     * are computed using the historical change in objective bounds when some
     * decision are taken. Note that this works whether we use an LP or not.
     *
     * @generated from enum value: PSEUDO_COST_SEARCH = 4;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["PSEUDO_COST_SEARCH"] = 4] = "PSEUDO_COST_SEARCH";
    /**
     * Mainly exposed here for testing. This quickly tries a lot of randomized
     * heuristics with a low conflict limit. It usually provides a good first
     * solution.
     *
     * @generated from enum value: PORTFOLIO_WITH_QUICK_RESTART_SEARCH = 5;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["PORTFOLIO_WITH_QUICK_RESTART_SEARCH"] = 5] = "PORTFOLIO_WITH_QUICK_RESTART_SEARCH";
    /**
     * Mainly used internally. This is like FIXED_SEARCH, except we follow the
     * solution_hint field of the CpModelProto rather than using the information
     * provided in the search_strategy.
     *
     * @generated from enum value: HINT_SEARCH = 6;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["HINT_SEARCH"] = 6] = "HINT_SEARCH";
    /**
     * Similar to FIXED_SEARCH, but differ in how the variable not listed into
     * the fixed search heuristics are branched on. This will always start the
     * search tree according to the specified fixed search strategy, but will
     * complete it using the default automatic search.
     *
     * @generated from enum value: PARTIAL_FIXED_SEARCH = 7;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["PARTIAL_FIXED_SEARCH"] = 7] = "PARTIAL_FIXED_SEARCH";
    /**
     * Randomized search. Used to increase entropy in the search.
     *
     * @generated from enum value: RANDOMIZED_SEARCH = 8;
     */
    SatParameters_SearchBranching[SatParameters_SearchBranching["RANDOMIZED_SEARCH"] = 8] = "RANDOMIZED_SEARCH";
})(SatParameters_SearchBranching || (SatParameters_SearchBranching = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.SearchBranching.
 */
export const SatParameters_SearchBranchingSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 8);
/**
 * @generated from enum operations_research.sat.SatParameters.SharedTreeSplitStrategy
 */
export var SatParameters_SharedTreeSplitStrategy;
(function (SatParameters_SharedTreeSplitStrategy) {
    /**
     * Uses the default strategy, currently equivalent to
     * SPLIT_STRATEGY_DISCREPANCY.
     *
     * @generated from enum value: SPLIT_STRATEGY_AUTO = 0;
     */
    SatParameters_SharedTreeSplitStrategy[SatParameters_SharedTreeSplitStrategy["SPLIT_STRATEGY_AUTO"] = 0] = "SPLIT_STRATEGY_AUTO";
    /**
     * Only accept splits if the node to be split's depth+discrepancy is minimal
     * for the desired number of leaves.
     * The preferred child for discrepancy calculation is the one with the
     * lowest objective lower bound or the original branch direction if the
     * bounds are equal. This rule allows twice as many workers to work in the
     * preferred subtree as non-preferred.
     *
     * @generated from enum value: SPLIT_STRATEGY_DISCREPANCY = 1;
     */
    SatParameters_SharedTreeSplitStrategy[SatParameters_SharedTreeSplitStrategy["SPLIT_STRATEGY_DISCREPANCY"] = 1] = "SPLIT_STRATEGY_DISCREPANCY";
    /**
     * Only split nodes with an objective lb equal to the global lb. If there is
     * no objective, this is equivalent to SPLIT_STRATEGY_FIRST_PROPOSAL.
     *
     * @generated from enum value: SPLIT_STRATEGY_OBJECTIVE_LB = 2;
     */
    SatParameters_SharedTreeSplitStrategy[SatParameters_SharedTreeSplitStrategy["SPLIT_STRATEGY_OBJECTIVE_LB"] = 2] = "SPLIT_STRATEGY_OBJECTIVE_LB";
    /**
     * Attempt to keep the shared tree balanced.
     *
     * @generated from enum value: SPLIT_STRATEGY_BALANCED_TREE = 3;
     */
    SatParameters_SharedTreeSplitStrategy[SatParameters_SharedTreeSplitStrategy["SPLIT_STRATEGY_BALANCED_TREE"] = 3] = "SPLIT_STRATEGY_BALANCED_TREE";
    /**
     * Workers race to split their subtree, the winner's proposal is accepted.
     *
     * @generated from enum value: SPLIT_STRATEGY_FIRST_PROPOSAL = 4;
     */
    SatParameters_SharedTreeSplitStrategy[SatParameters_SharedTreeSplitStrategy["SPLIT_STRATEGY_FIRST_PROPOSAL"] = 4] = "SPLIT_STRATEGY_FIRST_PROPOSAL";
})(SatParameters_SharedTreeSplitStrategy || (SatParameters_SharedTreeSplitStrategy = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.SharedTreeSplitStrategy.
 */
export const SatParameters_SharedTreeSplitStrategySchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 9);
/**
 * Rounding method to use for feasibility pump.
 *
 * @generated from enum operations_research.sat.SatParameters.FPRoundingMethod
 */
export var SatParameters_FPRoundingMethod;
(function (SatParameters_FPRoundingMethod) {
    /**
     * Rounds to the nearest integer value.
     *
     * @generated from enum value: NEAREST_INTEGER = 0;
     */
    SatParameters_FPRoundingMethod[SatParameters_FPRoundingMethod["NEAREST_INTEGER"] = 0] = "NEAREST_INTEGER";
    /**
     * Counts the number of linear constraints restricting the variable in the
     * increasing values (up locks) and decreasing values (down locks). Rounds
     * the variable in the direction of lesser locks.
     *
     * @generated from enum value: LOCK_BASED = 1;
     */
    SatParameters_FPRoundingMethod[SatParameters_FPRoundingMethod["LOCK_BASED"] = 1] = "LOCK_BASED";
    /**
     * Similar to lock based rounding except this only considers locks of active
     * constraints from the last lp solve.
     *
     * @generated from enum value: ACTIVE_LOCK_BASED = 3;
     */
    SatParameters_FPRoundingMethod[SatParameters_FPRoundingMethod["ACTIVE_LOCK_BASED"] = 3] = "ACTIVE_LOCK_BASED";
    /**
     * This is expensive rounding algorithm. We round variables one by one and
     * propagate the bounds in between. If none of the rounded values fall in
     * the continuous domain specified by lower and upper bound, we use the
     * current lower/upper bound (whichever one is closest) instead of rounding
     * the fractional lp solution value. If both the rounded values are in the
     * domain, we round to nearest integer.
     *
     * @generated from enum value: PROPAGATION_ASSISTED = 2;
     */
    SatParameters_FPRoundingMethod[SatParameters_FPRoundingMethod["PROPAGATION_ASSISTED"] = 2] = "PROPAGATION_ASSISTED";
})(SatParameters_FPRoundingMethod || (SatParameters_FPRoundingMethod = {}));
/**
 * Describes the enum operations_research.sat.SatParameters.FPRoundingMethod.
 */
export const SatParameters_FPRoundingMethodSchema = /*@__PURE__*/ enumDesc(file_sat_parameters, 0, 10);
//# sourceMappingURL=sat_parameters_pb.js.map