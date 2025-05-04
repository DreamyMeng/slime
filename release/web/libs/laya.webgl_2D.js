(function (exports, Laya) {
    'use strict';

    class WebDefineDatas {
        constructor() {
            this._mask = [];
            this._length = 0;
        }
        _intersectionDefineDatas(define) {
            var unionMask = define._mask;
            var mask = this._mask;
            for (var i = this._length - 1; i >= 0; i--) {
                var value = mask[i] & unionMask[i];
                if (value == 0 && i == this._length - 1)
                    this._length--;
                else
                    mask[i] = value;
            }
        }
        add(define) {
            var index = define._index;
            var size = index + 1;
            var mask = this._mask;
            var maskStart = this._length;
            if (maskStart < size) {
                (mask.length < size) && (mask.length = size);
                for (; maskStart < index; maskStart++)
                    mask[maskStart] = 0;
                mask[index] = define._value;
                this._length = size;
            }
            else {
                mask[index] |= define._value;
            }
        }
        remove(define) {
            var index = define._index;
            var mask = this._mask;
            var endIndex = this._length - 1;
            if (index > endIndex)
                return;
            var newValue = mask[index] & ~define._value;
            if (index == endIndex && newValue === 0)
                this._length--;
            else
                mask[index] = newValue;
        }
        addDefineDatas(define) {
            var addMask = define._mask;
            var size = define._length;
            var mask = this._mask;
            var maskStart = this._length;
            if (maskStart < size) {
                mask.length = size;
                for (var i = 0; i < maskStart; i++)
                    mask[i] |= addMask[i];
                for (; i < size; i++)
                    mask[i] = addMask[i];
                this._length = size;
            }
            else {
                for (var i = 0; i < size; i++) {
                    mask[i] |= addMask[i];
                }
            }
        }
        removeDefineDatas(define) {
            var removeMask = define._mask;
            var mask = this._mask;
            var endIndex = this._length - 1;
            var i = Math.min(define._length, endIndex);
            for (; i >= 0; i--) {
                var newValue = mask[i] & ~removeMask[i];
                if (i == endIndex && newValue === 0) {
                    endIndex--;
                    this._length--;
                }
                else {
                    mask[i] = newValue;
                }
            }
        }
        has(define) {
            var index = define._index;
            if (index >= this._length)
                return false;
            return (this._mask[index] & define._value) !== 0;
        }
        clear() {
            this._length = 0;
        }
        cloneTo(destObject) {
            var destMask = destObject._mask;
            var mask = this._mask;
            var count = this._length;
            destMask.length = count;
            for (var i = 0; i < count; i++)
                destMask[i] = mask[i];
            destObject._length = count;
        }
        clone() {
            var dest = new WebDefineDatas();
            this.cloneTo(dest);
            return dest;
        }
        destroy() {
            delete this._mask;
        }
    }

    exports.WebGLExtension = void 0;
    (function (WebGLExtension) {
        WebGLExtension[WebGLExtension["OES_vertex_array_object"] = 0] = "OES_vertex_array_object";
        WebGLExtension[WebGLExtension["ANGLE_instanced_arrays"] = 1] = "ANGLE_instanced_arrays";
        WebGLExtension[WebGLExtension["OES_texture_half_float"] = 2] = "OES_texture_half_float";
        WebGLExtension[WebGLExtension["OES_texture_half_float_linear"] = 3] = "OES_texture_half_float_linear";
        WebGLExtension[WebGLExtension["OES_texture_float"] = 4] = "OES_texture_float";
        WebGLExtension[WebGLExtension["OES_element_index_uint"] = 5] = "OES_element_index_uint";
        WebGLExtension[WebGLExtension["OES_texture_float_linear"] = 6] = "OES_texture_float_linear";
        WebGLExtension[WebGLExtension["EXT_color_buffer_half_float"] = 7] = "EXT_color_buffer_half_float";
        WebGLExtension[WebGLExtension["EXT_shader_texture_lod"] = 8] = "EXT_shader_texture_lod";
        WebGLExtension[WebGLExtension["WEBGL_depth_texture"] = 9] = "WEBGL_depth_texture";
        WebGLExtension[WebGLExtension["EXT_sRGB"] = 10] = "EXT_sRGB";
        WebGLExtension[WebGLExtension["EXT_color_buffer_float"] = 11] = "EXT_color_buffer_float";
        WebGLExtension[WebGLExtension["EXT_texture_filter_anisotropic"] = 12] = "EXT_texture_filter_anisotropic";
        WebGLExtension[WebGLExtension["WEBGL_compressed_texture_s3tc"] = 13] = "WEBGL_compressed_texture_s3tc";
        WebGLExtension[WebGLExtension["WEBGL_compressed_texture_s3tc_srgb"] = 14] = "WEBGL_compressed_texture_s3tc_srgb";
        WebGLExtension[WebGLExtension["WEBGL_compressed_texture_pvrtc"] = 15] = "WEBGL_compressed_texture_pvrtc";
        WebGLExtension[WebGLExtension["WEBGL_compressed_texture_etc1"] = 16] = "WEBGL_compressed_texture_etc1";
        WebGLExtension[WebGLExtension["WEBGL_compressed_texture_etc"] = 17] = "WEBGL_compressed_texture_etc";
        WebGLExtension[WebGLExtension["WEBGL_compressed_texture_astc"] = 18] = "WEBGL_compressed_texture_astc";
        WebGLExtension[WebGLExtension["OES_standard_derivatives"] = 19] = "OES_standard_derivatives";
    })(exports.WebGLExtension || (exports.WebGLExtension = {}));

    class GLObject {
        constructor(engine) {
            this._destroyed = false;
            this._engine = engine;
            this._gl = this._engine.gl;
            this._id = this._engine._IDCounter++;
        }
        get destroyed() {
            return this._destroyed;
        }
        destroy() {
            if (this._destroyed)
                return;
            this._destroyed = true;
        }
    }

    class WebGLInternalRT extends GLObject {
        get gpuMemory() {
            return this._gpuMemory;
        }
        set gpuMemory(value) {
            this._changeTexMemory(value);
            this._gpuMemory = value;
        }
        _changeTexMemory(value) {
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_GPUMemory, -this._gpuMemory + value);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_ALLRenderTexture, -this._gpuMemory + value);
        }
        constructor(engine, colorFormat, depthStencilFormat, isCube, generateMipmap, samples) {
            super(engine);
            this._gpuMemory = 0;
            this.colorFormat = colorFormat;
            this.depthStencilFormat = depthStencilFormat;
            this._isCube = isCube;
            this._generateMipmap = generateMipmap;
            this._samples = samples;
            this._textures = [];
            this._depthTexture = null;
            this._framebuffer = this._gl.createFramebuffer();
            if (samples > 1) {
                this._msaaFramebuffer = this._gl.createFramebuffer();
            }
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_ALLRenderTexture, 1);
        }
        dispose() {
            this._textures.forEach(tex => {
                tex && tex.dispose();
            });
            this._textures = null;
            this._depthTexture && this._depthTexture.dispose();
            this._depthTexture = null;
            this._framebuffer && this._gl.deleteFramebuffer(this._framebuffer);
            this._framebuffer = null;
            this._depthbuffer && this._gl.deleteRenderbuffer(this._depthbuffer);
            this._depthbuffer = null;
            this._msaaFramebuffer && this._gl.deleteFramebuffer(this._msaaFramebuffer);
            this._msaaFramebuffer = null;
            this._msaaRenderbuffer && this._gl.deleteRenderbuffer(this._msaaRenderbuffer);
            this._msaaRenderbuffer = null;
            this._changeTexMemory(0);
            this._gpuMemory = 0;
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_ALLRenderTexture, -1);
        }
    }

    class WebGLInternalTex extends GLObject {
        get mipmap() {
            return this._mipmap;
        }
        get mipmapCount() {
            return this._mipmapCount;
        }
        _getSource() {
            return this.resource;
        }
        get gpuMemory() {
            return this._gpuMemory;
        }
        set gpuMemory(value) {
            this._changeTexMemory(value);
            this._gpuMemory = value;
        }
        constructor(engine, target, width, height, depth, dimension, mipmap, useSRGBLoader, gammaCorrection) {
            super(engine);
            this._gpuMemory = 0;
            this._baseMipmapLevel = 0;
            this._maxMipmapLevel = 0;
            this.resource = this._gl.createTexture();
            this.width = width;
            this.height = height;
            this.depth = depth;
            const isPot = (value) => {
                return (value & (value - 1)) === 0;
            };
            this.isPotSize = isPot(width) && isPot(height);
            if (dimension == Laya.TextureDimension.Tex3D) {
                this.isPotSize = this.isPotSize && isPot(this.depth);
            }
            switch (dimension) {
                case Laya.TextureDimension.Tex2D:
                    this._statistics_M_Texture = Laya.GPUEngineStatisticsInfo.M_Texture2D;
                    this._statistics_RC_Texture = Laya.GPUEngineStatisticsInfo.RC_Texture2D;
                    break;
                case Laya.TextureDimension.Tex3D:
                    this._statistics_M_Texture = Laya.GPUEngineStatisticsInfo.M_Texture3D;
                    this._statistics_RC_Texture = Laya.GPUEngineStatisticsInfo.RC_Texture3D;
                    break;
                case Laya.TextureDimension.Cube:
                    this._statistics_M_Texture = Laya.GPUEngineStatisticsInfo.M_TextureCube;
                    this._statistics_RC_Texture = Laya.GPUEngineStatisticsInfo.RC_TextureCube;
                    break;
                case Laya.TextureDimension.Texture2DArray:
                    this._statistics_M_Texture = Laya.GPUEngineStatisticsInfo.M_Texture2DArray;
                    this._statistics_RC_Texture = Laya.GPUEngineStatisticsInfo.RC_Texture2DArray;
                    break;
            }
            this._mipmap = mipmap && this.isPotSize;
            this._mipmapCount = this._mipmap ? Math.max(Math.ceil(Math.log2(width)) + 1, Math.ceil(Math.log2(height)) + 1) : 1;
            this._maxMipmapLevel = this._mipmapCount - 1;
            this._baseMipmapLevel = 0;
            this.useSRGBLoad = useSRGBLoader;
            this.gammaCorrection = gammaCorrection;
            this.target = target;
            this.filterMode = Laya.FilterMode.Bilinear;
            this.wrapU = Laya.WrapMode.Repeat;
            this.wrapV = Laya.WrapMode.Repeat;
            this.wrapW = Laya.WrapMode.Repeat;
            this.anisoLevel = 4;
            this.compareMode = Laya.TextureCompareMode.None;
            WebGLEngine.instance._addStatisticsInfo(this._statistics_RC_Texture, 1);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_ALLTexture, 1);
        }
        get filterMode() {
            return this._filterMode;
        }
        set filterMode(value) {
            if (this._filterMode != value && this.resource) {
                let gl = this._gl;
                let mipmap = this.mipmap;
                let min = this.getFilteMinrParam(value, mipmap);
                this._setTexParameteri(gl.TEXTURE_MIN_FILTER, min);
                let mag = this.getFilterMagParam(value);
                this._setTexParameteri(gl.TEXTURE_MAG_FILTER, mag);
                this._filterMode = value;
            }
        }
        get wrapU() {
            return this._warpU;
        }
        set wrapU(value) {
            if (this._warpU != value && this.resource) {
                let gl = this._gl;
                let warpParam = this.getWrapParam(value);
                this._setWrapMode(gl.TEXTURE_WRAP_S, warpParam);
                this._warpU = value;
            }
        }
        get wrapV() {
            return this._warpV;
        }
        set wrapV(value) {
            if (this._warpV != value && this.resource) {
                let gl = this._gl;
                let warpParam = this.getWrapParam(value);
                this._setWrapMode(gl.TEXTURE_WRAP_T, warpParam);
                this._warpV = value;
            }
        }
        get wrapW() {
            return this._warpW;
        }
        set wrapW(value) {
            if (this._warpW != value && this.resource) {
                if (this._engine.getCapable(Laya.RenderCapable.Texture3D)) {
                    let gl = this._gl;
                    let warpParam = this.getWrapParam(value);
                    this._setWrapMode(gl.TEXTURE_WRAP_R, warpParam);
                }
                this._warpW = value;
            }
        }
        get anisoLevel() {
            return this._anisoLevel;
        }
        set anisoLevel(value) {
            let anisoExt = this._engine._supportCapatable.getExtension(exports.WebGLExtension.EXT_texture_filter_anisotropic);
            if (anisoExt) {
                this._gl;
                let maxAnisoLevel = this._engine.getParams(Laya.RenderParams.Max_AnisoLevel_Count);
                let level = Math.max(1, Math.min(maxAnisoLevel, value));
                this._setTexParametexf(anisoExt.TEXTURE_MAX_ANISOTROPY_EXT, level);
                this._anisoLevel = level;
            }
            else {
                this._anisoLevel = 1;
            }
        }
        set baseMipmapLevel(value) {
            if (this._engine.isWebGL2) {
                this._setTexParameteri(this._gl.TEXTURE_BASE_LEVEL, value);
            }
            this._baseMipmapLevel = value;
        }
        get baseMipmapLevel() {
            return this._baseMipmapLevel;
        }
        set maxMipmapLevel(value) {
            if (this._engine.isWebGL2) {
                this._setTexParameteri(this._gl.TEXTURE_MAX_LEVEL, value);
            }
            this._maxMipmapLevel = value;
        }
        get maxMipmapLevel() {
            return this._maxMipmapLevel;
        }
        get compareMode() {
            return this._compareMode;
        }
        set compareMode(value) {
            this._compareMode = value;
        }
        _setTexParameteri(pname, param) {
            let gl = this._gl;
            let target = this.target;
            this._engine._bindTexture(target, this.resource);
            gl.texParameteri(target, pname, param);
            this._engine._bindTexture(target, null);
        }
        _setTexParametexf(pname, param) {
            let gl = this._gl;
            let target = this.target;
            this._engine._bindTexture(target, this.resource);
            gl.texParameterf(target, pname, param);
            this._engine._bindTexture(target, null);
        }
        getFilteMinrParam(filterMode, mipmap) {
            let gl = this._gl;
            switch (filterMode) {
                case Laya.FilterMode.Point:
                    return mipmap ? gl.NEAREST_MIPMAP_NEAREST : gl.NEAREST;
                case Laya.FilterMode.Bilinear:
                    return mipmap ? gl.LINEAR_MIPMAP_NEAREST : gl.LINEAR;
                case Laya.FilterMode.Trilinear:
                    return mipmap ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR;
                default:
                    return mipmap ? gl.LINEAR_MIPMAP_NEAREST : gl.LINEAR;
            }
        }
        getFilterMagParam(filterMode) {
            let gl = this._gl;
            switch (filterMode) {
                case Laya.FilterMode.Point:
                    return gl.NEAREST;
                case Laya.FilterMode.Bilinear:
                    return gl.LINEAR;
                case Laya.FilterMode.Trilinear:
                    return gl.LINEAR;
                default:
                    return gl.LINEAR;
            }
        }
        getWrapParam(wrapMode) {
            let gl = this._gl;
            switch (wrapMode) {
                case Laya.WrapMode.Repeat:
                    return gl.REPEAT;
                case Laya.WrapMode.Clamp:
                    return gl.CLAMP_TO_EDGE;
                case Laya.WrapMode.Mirrored:
                    return gl.MIRRORED_REPEAT;
                default:
                    return gl.REPEAT;
            }
        }
        _setWrapMode(pname, param) {
            let gl = this._gl;
            if (!this.isPotSize) {
                param = gl.CLAMP_TO_EDGE;
            }
            this._setTexParameteri(pname, param);
        }
        _changeTexMemory(memory) {
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_GPUMemory, -this._gpuMemory + memory);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_ALLTexture, -this._gpuMemory + memory);
            this._engine._addStatisticsInfo(this._statistics_M_Texture, -this._gpuMemory + memory);
        }
        dispose() {
            let gl = this._gl;
            gl.deleteTexture(this.resource);
            this._changeTexMemory(0);
            this._gpuMemory = 0;
            WebGLEngine.instance._addStatisticsInfo(this._statistics_RC_Texture, -1);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_ALLTexture, -1);
        }
    }

    class GLTextureContext extends GLObject {
        constructor(engine) {
            super(engine);
            this._glParam = {
                internalFormat: 0,
                format: 0,
                type: 0,
            };
            this.needBitmap = false;
            this._sRGB = this._engine._supportCapatable.getExtension(exports.WebGLExtension.EXT_sRGB);
            this._oesTextureHalfFloat = this._engine._supportCapatable.getExtension(exports.WebGLExtension.OES_texture_half_float);
            this._compressdTextureS3tc_srgb = this._engine._supportCapatable.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_s3tc_srgb);
            this._compressedTextureEtc1 = this._engine._supportCapatable.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_etc1);
            this._compressedTextureS3tc = this._engine._supportCapatable.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_s3tc);
            this._compressedTextureETC = this._engine._supportCapatable.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_etc);
            this._compressedTextureASTC = this._engine._supportCapatable.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_astc);
            this._webgl_depth_texture = this._engine._supportCapatable.getExtension(exports.WebGLExtension.WEBGL_depth_texture);
        }
        createTexture3DInternal(dimension, width, height, depth, format, generateMipmap, sRGB, premultipliedAlpha) {
            return null;
        }
        setTexture3DImageData(texture, source, depth, premultiplyAlpha, invertY) {
            return null;
        }
        setTexture3DPixelsData(texture, source, depth, premultiplyAlpha, invertY) {
            return null;
        }
        setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY) {
            return null;
        }
        glTextureParam(format, useSRGB) {
            let gl = this._gl;
            this._glParam.internalFormat = null;
            this._glParam.format = null;
            this._glParam.type = null;
            switch (format) {
                case Laya.TextureFormat.R8G8B8:
                    this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_EXT : gl.RGB;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.R8G8B8A8:
                    this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_ALPHA_EXT : gl.RGBA;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.R5G6B5:
                    this._glParam.internalFormat = gl.RGB;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_SHORT_5_6_5;
                    break;
                case Laya.TextureFormat.R32G32B32A32:
                    this._glParam.internalFormat = gl.RGBA;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.TextureFormat.R32G32B32:
                    this._glParam.internalFormat = gl.RGB;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.TextureFormat.R16G16B16A16:
                    this._glParam.internalFormat = gl.RGBA;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                    break;
                case Laya.TextureFormat.R16G16B16:
                    this._glParam.internalFormat = gl.RGB;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                    break;
                case Laya.TextureFormat.DXT1:
                    this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.DXT3:
                    this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.DXT5:
                    this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ETC1RGB:
                    this._glParam.internalFormat = this._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ETC2RGBA:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGBA8_ETC2_EAC;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ETC2RGB:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGB8_ETC2;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ETC2SRGB:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_ETC2;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ETC2SRGB_Alpha8:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ETC2RGB_Alpha1:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ETC2SRGB_Alpha1:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC4x4:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_4x4_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC6x6:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_6x6_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC8x8:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_8x8_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC10x10:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_10x10_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC12x12:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_12x12_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC4x4SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC6x6SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC8x8SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC10x10SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.ASTC12x12SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                default:
                    throw "Unknown Texture Format.";
            }
            return this._glParam;
        }
        glRenderTextureParam(format, useSRGB) {
            let gl = this._gl;
            this._glParam.internalFormat = null;
            this._glParam.format = null;
            this._glParam.type = null;
            switch (format) {
                case Laya.RenderTargetFormat.R8G8B8:
                    this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_EXT : gl.RGB;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.RenderTargetFormat.R8G8B8A8:
                    this._glParam.internalFormat = useSRGB ? this._sRGB.SRGB_EXT : gl.RGBA;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.RenderTargetFormat.R16G16B16:
                    this._glParam.internalFormat = gl.RGB;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                    break;
                case Laya.RenderTargetFormat.R16G16B16A16:
                    this._glParam.internalFormat = gl.RGBA;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = this._oesTextureHalfFloat.HALF_FLOAT_OES;
                    break;
                case Laya.RenderTargetFormat.R32G32B32:
                    this._glParam.internalFormat = gl.RGB;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.RenderTargetFormat.R32G32B32A32:
                    this._glParam.internalFormat = gl.RGBA;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.RenderTargetFormat.DEPTH_16:
                    this._glParam.internalFormat = gl.DEPTH_COMPONENT;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_SHORT;
                    break;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    this._glParam.internalFormat = gl.DEPTH_STENCIL;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = this._webgl_depth_texture.UNSIGNED_INT_24_8_WEBGL;
                    break;
                case Laya.RenderTargetFormat.DEPTH_32:
                    this._glParam.internalFormat = gl.DEPTH_COMPONENT;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_INT;
                    break;
                case Laya.RenderTargetFormat.STENCIL_8:
                default:
                    throw "render texture format wrong.";
            }
            return this._glParam;
        }
        glRenderBufferParam(format, useSRGB) {
            let gl = this._gl;
            switch (format) {
                case Laya.RenderTargetFormat.DEPTH_16:
                    return { internalFormat: gl.DEPTH_COMPONENT16, attachment: gl.DEPTH_ATTACHMENT };
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    return { internalFormat: gl.DEPTH_STENCIL, attachment: gl.DEPTH_STENCIL_ATTACHMENT };
                case Laya.RenderTargetFormat.DEPTH_32:
                    return { internalFormat: gl.DEPTH_STENCIL, attachment: gl.DEPTH_STENCIL_ATTACHMENT };
                case Laya.RenderTargetFormat.STENCIL_8:
                    return { internalFormat: gl.STENCIL_INDEX8, attachment: gl.STENCIL_ATTACHMENT };
                default:
                    return null;
            }
        }
        glRenderTargetAttachment(format) {
            let gl = this._gl;
            switch (format) {
                case Laya.RenderTargetFormat.DEPTH_16:
                    return gl.DEPTH_ATTACHMENT;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    return gl.DEPTH_STENCIL_ATTACHMENT;
                case Laya.RenderTargetFormat.DEPTH_32:
                    return gl.DEPTH_ATTACHMENT;
                case Laya.RenderTargetFormat.STENCIL_8:
                    return gl.STENCIL_ATTACHMENT;
                case Laya.RenderTargetFormat.R8G8B8:
                case Laya.RenderTargetFormat.R8G8B8A8:
                case Laya.RenderTargetFormat.R16G16B16:
                case Laya.RenderTargetFormat.R16G16B16A16:
                case Laya.RenderTargetFormat.R32G32B32:
                case Laya.RenderTargetFormat.R32G32B32A32:
                    return gl.COLOR_ATTACHMENT0;
                default:
                    throw "render format.";
            }
        }
        getTarget(dimension) {
            let gl = this._gl;
            switch (dimension) {
                case Laya.TextureDimension.Tex2D:
                    return gl.TEXTURE_2D;
                case Laya.TextureDimension.Cube:
                    return gl.TEXTURE_CUBE_MAP;
                default:
                    throw "texture dimension wrong in WebGL1.";
            }
        }
        getFormatPixelsParams(format) {
            let formatParams = {
                channels: 0,
                bytesPerPixel: 0,
                dataTypedCons: Uint8Array,
                typedSize: 1
            };
            switch (format) {
                case Laya.TextureFormat.R8G8B8A8:
                    formatParams.channels = 4;
                    formatParams.bytesPerPixel = 4;
                    formatParams.dataTypedCons = Uint8Array;
                    formatParams.typedSize = 1;
                    return formatParams;
                case Laya.TextureFormat.R8G8B8:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 3;
                    formatParams.dataTypedCons = Uint8Array;
                    formatParams.typedSize = 1;
                    return formatParams;
                case Laya.TextureFormat.R5G6B5:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 2;
                    formatParams.dataTypedCons = Uint16Array;
                    formatParams.typedSize = 2;
                    return formatParams;
                case Laya.TextureFormat.R16G16B16:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 6;
                    formatParams.dataTypedCons = Uint16Array;
                    formatParams.typedSize = 2;
                    return formatParams;
                case Laya.TextureFormat.R16G16B16A16:
                    formatParams.channels = 4;
                    formatParams.bytesPerPixel = 8;
                    formatParams.dataTypedCons = Uint16Array;
                    formatParams.typedSize = 2;
                    return formatParams;
                case Laya.TextureFormat.R32G32B32:
                    formatParams.channels = 3;
                    formatParams.bytesPerPixel = 12;
                    formatParams.dataTypedCons = Float32Array;
                    formatParams.typedSize = 4;
                    return formatParams;
                case Laya.TextureFormat.R32G32B32A32:
                    formatParams.channels = 4;
                    formatParams.bytesPerPixel = 16;
                    formatParams.dataTypedCons = Float32Array;
                    formatParams.typedSize = 4;
                    return formatParams;
                default:
                    return formatParams;
            }
        }
        getGLtexMemory(tex, depth = 1) {
            let gl = this._gl;
            let channels = 0;
            let singlebyte = 0;
            let bytelength = 0;
            let srgb = this._sRGB ? this._sRGB.SRGB_EXT : gl.RGB;
            let srgb_alpha = this._sRGB ? this._sRGB.SRGB_ALPHA_EXT : gl.RGBA;
            switch (tex.internalFormat) {
                case srgb:
                case gl.RGB:
                    channels = 3;
                    break;
                case srgb_alpha:
                case gl.RGBA:
                    channels = 4;
                    break;
                default:
                    channels = 0;
                    break;
            }
            switch (tex.type) {
                case gl.UNSIGNED_BYTE:
                    singlebyte = 1;
                    break;
                case gl.UNSIGNED_SHORT_5_6_5:
                    singlebyte = 2 / 3;
                    break;
                case gl.FLOAT:
                    singlebyte = 4;
                    break;
                case this._oesTextureHalfFloat.HALF_FLOAT_OES:
                    singlebyte = 2;
                    break;
                default:
                    singlebyte = 0;
                    break;
            }
            bytelength = channels * singlebyte * tex.width * tex.height;
            if (tex.mipmap) {
                bytelength *= 1.333;
            }
            if (tex.target == gl.TEXTURE_CUBE_MAP)
                bytelength *= 6;
            else if (tex.target == gl.TEXTURE_2D)
                bytelength *= 1;
            return bytelength;
        }
        getGLRTTexMemory(width, height, colorFormat, depthStencilFormat, generateMipmap, multiSamples, cube) {
            let getpixelbyte = (rtFormat) => {
                let pixelByte = 0;
                switch (rtFormat) {
                    case Laya.RenderTargetFormat.R8G8B8:
                        pixelByte = 3;
                        break;
                    case Laya.RenderTargetFormat.R8G8B8A8:
                        pixelByte = 4;
                        break;
                    case Laya.RenderTargetFormat.R16G16B16A16:
                        pixelByte = 8;
                        break;
                    case Laya.RenderTargetFormat.R32G32B32:
                        pixelByte = 12;
                        break;
                    case Laya.RenderTargetFormat.R32G32B32A32:
                        pixelByte = 16;
                        break;
                    case Laya.RenderTargetFormat.R16G16B16:
                        pixelByte = 6;
                        break;
                    case Laya.RenderTargetFormat.DEPTH_16:
                        pixelByte = 2;
                        break;
                    case Laya.RenderTargetFormat.STENCIL_8:
                        pixelByte = 1;
                        break;
                    case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                        pixelByte = 4;
                        break;
                    case Laya.RenderTargetFormat.DEPTH_32:
                        pixelByte = 4;
                        break;
                }
                return pixelByte;
            };
            let colorPixelbyte = getpixelbyte(colorFormat);
            let depthPixelbyte = getpixelbyte(depthStencilFormat);
            if (multiSamples > 1)
                colorPixelbyte *= 2;
            if (cube)
                colorPixelbyte *= 6;
            if (generateMipmap)
                colorPixelbyte *= 1.333;
            let colorMemory = colorPixelbyte * width * height;
            let depthMemory = depthPixelbyte * width * height;
            return colorMemory + depthMemory;
        }
        supportSRGB(format, mipmap) {
            switch (format) {
                case Laya.TextureFormat.R8G8B8:
                case Laya.TextureFormat.R8G8B8A8:
                    return this._engine.getCapable(Laya.RenderCapable.Texture_SRGB) && !mipmap;
                case Laya.TextureFormat.DXT1:
                case Laya.TextureFormat.DXT3:
                case Laya.TextureFormat.DXT5:
                    return this._engine.getCapable(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB) && !mipmap;
                default:
                    return false;
            }
        }
        supportGenerateMipmap(format) {
            switch (format) {
                case Laya.RenderTargetFormat.DEPTH_16:
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                case Laya.RenderTargetFormat.DEPTH_32:
                case Laya.RenderTargetFormat.STENCIL_8:
                    return false;
                default:
                    return true;
            }
        }
        isSRGBFormat(format) {
            switch (format) {
                case Laya.TextureFormat.ETC2SRGB:
                case Laya.TextureFormat.ETC2SRGB_Alpha8:
                case Laya.TextureFormat.ETC2SRGB_Alpha1:
                case Laya.TextureFormat.ASTC4x4SRGB:
                case Laya.TextureFormat.ASTC6x6SRGB:
                case Laya.TextureFormat.ASTC8x8SRGB:
                case Laya.TextureFormat.ASTC10x10SRGB:
                case Laya.TextureFormat.ASTC12x12SRGB:
                    return true;
                default:
                    return false;
            }
        }
        createTextureInternal(dimension, width, height, format, generateMipmap, sRGB, premultipliedAlpha) {
            let useSRGBExt = this.isSRGBFormat(format) || (sRGB && this.supportSRGB(format, generateMipmap));
            if (premultipliedAlpha) {
                useSRGBExt = false;
            }
            let gammaCorrection = 1.0;
            if (!useSRGBExt && sRGB) {
                gammaCorrection = 2.2;
            }
            let target = this.getTarget(dimension);
            let internalTex = new WebGLInternalTex(this._engine, target, width, height, 1, dimension, generateMipmap, useSRGBExt, gammaCorrection);
            let glParam = this.glTextureParam(format, useSRGBExt);
            internalTex.internalFormat = glParam.internalFormat;
            internalTex.format = glParam.format;
            internalTex.type = glParam.type;
            return internalTex;
        }
        setTextureImageData(texture, source, premultiplyAlpha, invertY) {
            if (texture.width != source.width || texture.height != source.height) {
                console.warn("setTextureImageData: size not match");
            }
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            texture.width;
            texture.height;
            let gl = texture._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texImage2D(target, 0, internalFormat, format, type, source);
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        setTextureSubImageData(texture, source, x, y, premultiplyAlpha, invertY) {
            let target = texture.target;
            texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            source.width;
            source.height;
            let gl = texture._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texSubImage2D(target, 0, x, y, format, type, source);
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        initVideoTextureData(texture) {
            let target = texture.target;
            texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let gl = texture._gl;
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texImage2D(target, 0, texture.internalFormat, width, height, 0, format, type, null);
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
        }
        setTexturePixelsData(texture, source, premultiplyAlpha, invertY) {
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = texture._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texImage2D(target, 0, internalFormat, width, height, 0, format, type, source);
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTextureSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
            generateMipmap = generateMipmap && mipmapLevel == 0;
            let target = texture.target;
            texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = texture._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texSubImage2D(target, mipmapLevel, xOffset, yOffset, width, height, format, type, source);
            if (texture.mipmap && generateMipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTextureDDSData(texture, ddsInfo) {
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let source = ddsInfo.source;
            let dataOffset = ddsInfo.dataOffset;
            let bpp = ddsInfo.bpp;
            let blockBytes = ddsInfo.blockBytes;
            let mipmapCount = ddsInfo.mipmapCount;
            let compressed = ddsInfo.compressed;
            texture.maxMipmapLevel = mipmapCount - 1;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = texture._gl;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            let formatParams = this.getFormatPixelsParams(ddsInfo.format);
            let channelsByte = formatParams.bytesPerPixel / formatParams.channels;
            let dataTypeConstur = formatParams.dataTypedCons;
            let mipmapWidth = width;
            let mipmapHeight = height;
            let memory = 0;
            for (let index = 0; index < mipmapCount; index++) {
                if (compressed) {
                    let dataLength = (((Math.max(4, mipmapWidth) / 4) * Math.max(4, mipmapHeight)) / 4) * blockBytes;
                    let sourceData = new Uint8Array(source, dataOffset, dataLength);
                    gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);
                    memory += sourceData.length;
                    dataOffset += bpp ? (mipmapWidth * mipmapHeight * (bpp / 8)) : dataLength;
                }
                else {
                    let dataLength = mipmapWidth * mipmapHeight * formatParams.channels;
                    let sourceData = new dataTypeConstur(source, dataOffset, dataLength);
                    memory += sourceData.length;
                    gl.texImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, format, type, sourceData);
                    dataOffset += dataLength * channelsByte;
                }
                mipmapWidth *= 0.5;
                mipmapHeight *= 0.5;
                mipmapWidth = Math.max(1.0, mipmapWidth);
                mipmapHeight = Math.max(1.0, mipmapHeight);
            }
            texture.gpuMemory = memory;
            this._engine._bindTexture(texture.target, null);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTextureKTXData(texture, ktxInfo) {
            let source = ktxInfo.source;
            let compressed = ktxInfo.compress;
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let mipmapCount = texture.mipmapCount;
            let width = texture.width;
            let height = texture.height;
            texture.maxMipmapLevel = mipmapCount - 1;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = texture._gl;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            let mipmapWidth = width;
            let mipmapHeight = height;
            let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
            let memory = 0;
            for (let index = 0; index < ktxInfo.mipmapCount; index++) {
                let imageSize = new Int32Array(source, dataOffset, 1)[0];
                dataOffset += 4;
                if (compressed) {
                    let sourceData = new Uint8Array(source, dataOffset, imageSize);
                    gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);
                    memory += sourceData.length;
                }
                else {
                    let pixelParams = this.getFormatPixelsParams(ktxInfo.format);
                    let typedSize = imageSize / pixelParams.typedSize;
                    let sourceData = new pixelParams.dataTypedCons(source, dataOffset, typedSize);
                    gl.texImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, format, type, sourceData);
                    memory += sourceData.byteLength;
                }
                dataOffset += imageSize;
                dataOffset += 3 - ((imageSize + 3) % 4);
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            for (let index = ktxInfo.mipmapCount; index < texture.mipmapCount; index++) {
                if (compressed) ;
                else {
                    gl.texImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, format, type, null);
                }
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            texture.gpuMemory = memory;
            this._engine._bindTexture(texture.target, null);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTextureHDRData(texture, hdrInfo) {
            let hdrPixelData = hdrInfo.readScanLine();
            this.setTexturePixelsData(texture, hdrPixelData, false, false);
        }
        setCubeImageData(texture, sources, premultiplyAlpha, invertY) {
            let gl = texture._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            ];
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            texture.width;
            texture.height;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            this._engine._bindTexture(texture.target, texture.resource);
            for (let index = 0; index < cubeFace.length; index++) {
                let target = cubeFace[index];
                gl.texImage2D(target, 0, internalFormat, format, type, sources[index]);
            }
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            texture.gpuMemory = this.getGLtexMemory(texture);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        setCubePixelsData(texture, source, premultiplyAlpha, invertY) {
            let gl = texture._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            ];
            texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let fourSize = width % 4 == 0;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            if (source) {
                for (let index = 0; index < cubeFace.length; index++) {
                    let t = cubeFace[index];
                    gl.texImage2D(t, 0, internalFormat, width, height, 0, format, type, source[index]);
                }
                if (texture.mipmap) {
                    gl.generateMipmap(texture.target);
                }
            }
            else {
                for (let index = 0; index < cubeFace.length; index++) {
                    let t = cubeFace[index];
                    gl.texImage2D(t, 0, internalFormat, width, height, 0, format, type, null);
                }
                if (texture.mipmap) {
                    gl.generateMipmap(texture.target);
                }
            }
            this._engine._bindTexture(texture.target, null);
            texture.gpuMemory = this.getGLtexMemory(texture);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setCubeSubPixelData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, width, height, premultiplyAlpha, invertY) {
            generateMipmap = generateMipmap && mipmapLevel == 0;
            let gl = texture._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            ];
            texture.target;
            texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let fourSize = width % 4 == 0;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            for (let index = 0; index < cubeFace.length; index++) {
                let target = cubeFace[index];
                gl.texSubImage2D(target, mipmapLevel, xOffset, yOffset, width, height, format, type, source[index]);
            }
            if (texture.mipmap && generateMipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setCubeDDSData(texture, ddsInfo) {
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let source = ddsInfo.source;
            let dataOffset = ddsInfo.dataOffset;
            let bpp = ddsInfo.bpp;
            let blockBytes = ddsInfo.blockBytes;
            let mipmapCount = ddsInfo.mipmapCount;
            texture.maxMipmapLevel = mipmapCount - 1;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            fourSize = true;
            let gl = texture._gl;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            ];
            let formatParams = this.getFormatPixelsParams(ddsInfo.format);
            let channelsByte = formatParams.bytesPerPixel / formatParams.channels;
            let dataTypeConstur = formatParams.dataTypedCons;
            let memory = 0;
            if (!ddsInfo.compressed) {
                for (let face = 0; face < 6; face++) {
                    let target = cubeFace[face];
                    let mipmapWidth = width;
                    let mipmapHeight = height;
                    for (let index = 0; index < mipmapCount; index++) {
                        let dataLength = mipmapWidth * mipmapHeight * formatParams.channels;
                        let sourceData = new dataTypeConstur(source, dataOffset, dataLength);
                        gl.texImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, format, type, sourceData);
                        memory += sourceData.byteLength;
                        dataOffset += dataLength * channelsByte;
                        mipmapWidth *= 0.5;
                        mipmapHeight *= 0.5;
                        mipmapWidth = Math.max(1.0, mipmapWidth);
                        mipmapHeight = Math.max(1.0, mipmapHeight);
                    }
                }
            }
            else {
                for (let face = 0; face < 6; face++) {
                    let target = cubeFace[face];
                    let mipmapWidth = width;
                    let mipmapHeight = height;
                    for (let index = 0; index < mipmapCount; index++) {
                        let dataLength = Math.max(4, mipmapWidth) / 4 * Math.max(4, mipmapHeight) / 4 * blockBytes;
                        let sourceData = new Uint8Array(source, dataOffset, dataLength);
                        (texture.mipmap || index == 0) && gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);
                        memory += sourceData.byteLength;
                        dataOffset += bpp ? (mipmapWidth * mipmapHeight * (bpp / 8)) : dataLength;
                        mipmapWidth *= 0.5;
                        mipmapHeight *= 0.5;
                        mipmapWidth = Math.max(1.0, mipmapWidth);
                        mipmapHeight = Math.max(1.0, mipmapHeight);
                    }
                }
            }
            texture.gpuMemory = memory;
            this._engine._bindTexture(texture.target, null);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setCubeKTXData(texture, ktxInfo) {
            let source = ktxInfo.source;
            let compressed = ktxInfo.compress;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let mipmapCount = ktxInfo.mipmapCount;
            let width = texture.width;
            let height = texture.height;
            texture.maxMipmapLevel = mipmapCount - 1;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = texture._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            ];
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            let mipmapWidth = width;
            let mipmapHeight = height;
            let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
            let memory = 0;
            for (let index = 0; index < ktxInfo.mipmapCount; index++) {
                let imageSize = new Int32Array(source, dataOffset, 1)[0];
                dataOffset += 4;
                for (let face = 0; face < 6; face++) {
                    let target = cubeFace[face];
                    if (compressed) {
                        let sourceData = new Uint8Array(source, dataOffset, imageSize);
                        gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);
                        memory += sourceData.byteLength;
                    }
                    else {
                        let pixelParams = this.getFormatPixelsParams(ktxInfo.format);
                        let typedSize = imageSize / pixelParams.typedSize;
                        let sourceData = new pixelParams.dataTypedCons(source, dataOffset, typedSize);
                        gl.texImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, format, type, sourceData);
                        memory += sourceData.byteLength;
                    }
                    dataOffset += imageSize;
                    dataOffset += 3 - ((imageSize + 3) % 4);
                }
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            for (let index = ktxInfo.mipmapCount; index < texture.mipmapCount; index++) {
                for (let face = 0; face < 6; face++) {
                    let target = cubeFace[face];
                    if (compressed) ;
                    else {
                        gl.texImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, format, type, null);
                    }
                }
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            this._engine._bindTexture(texture.target, null);
            texture.gpuMemory = memory;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTextureCompareMode(texture, compareMode) {
            return Laya.TextureCompareMode.None;
        }
        bindRenderTarget(renderTarget, faceIndex = 0) {
            this.currentActiveRT && this.unbindRenderTarget(this.currentActiveRT);
            let gl = this._gl;
            let framebuffer = renderTarget._framebuffer;
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            if (renderTarget._isCube) {
                let texture = renderTarget._textures[0];
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, texture.resource, 0);
            }
            this.currentActiveRT = renderTarget;
        }
        bindoutScreenTarget() {
            if (this.currentActiveRT != WebGLEngine._lastFrameBuffer) {
                this.unbindRenderTarget(this.currentActiveRT);
            }
        }
        unbindRenderTarget(renderTarget) {
            let gl = renderTarget._gl;
            if (renderTarget && renderTarget._generateMipmap) {
                renderTarget._textures.forEach(tex => {
                    let target = tex.target;
                    this._engine._bindTexture(target, tex.resource);
                    gl.generateMipmap(target);
                    this._engine._bindTexture(target, null);
                });
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            this.currentActiveRT = WebGLEngine._lastFrameBuffer;
        }
        createRenderTextureCubeInternal(dimension, size, format, generateMipmap, sRGB) {
            let useSRGBExt = false;
            generateMipmap = generateMipmap && this.supportGenerateMipmap(format);
            let gammaCorrection = 1.0;
            let target = this.getTarget(dimension);
            let internalTex = new WebGLInternalTex(this._engine, target, size, size, 1, dimension, generateMipmap, useSRGBExt, gammaCorrection);
            let glParam = this.glRenderTextureParam(format, useSRGBExt);
            internalTex.internalFormat = glParam.internalFormat;
            internalTex.format = glParam.format;
            internalTex.type = glParam.type;
            let internalFormat = internalTex.internalFormat;
            let glFormat = internalTex.format;
            let type = internalTex.type;
            let gl = internalTex._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            ];
            this._engine._bindTexture(internalTex.target, internalTex.resource);
            for (let index = 0; index < cubeFace.length; index++) {
                let target = cubeFace[index];
                gl.texImage2D(target, 0, internalFormat, size, size, 0, glFormat, type, null);
            }
            this._engine._bindTexture(internalTex.target, null);
            if (format == Laya.RenderTargetFormat.DEPTH_16 || format == Laya.RenderTargetFormat.DEPTH_32 || format == Laya.RenderTargetFormat.DEPTHSTENCIL_24_8) {
                internalTex.filterMode = Laya.FilterMode.Point;
            }
            return internalTex;
        }
        createRenderTargetInternal(width, height, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            multiSamples = 1;
            let texture = this.createRenderTextureInternal(Laya.TextureDimension.Tex2D, width, height, colorFormat, generateMipmap, sRGB);
            let renderTarget = new WebGLInternalRT(this._engine, colorFormat, depthStencilFormat, false, texture.mipmap, multiSamples);
            renderTarget.gpuMemory = this.getGLRTTexMemory(width, height, colorFormat, depthStencilFormat, generateMipmap, multiSamples, false);
            renderTarget.colorFormat = colorFormat;
            renderTarget.depthStencilFormat = depthStencilFormat;
            renderTarget._textures.push(texture);
            let framebuffer = renderTarget._framebuffer;
            let gl = renderTarget._gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            let colorAttachment = this.glRenderTargetAttachment(colorFormat);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment, gl.TEXTURE_2D, texture.resource, 0);
            let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
            if (depthBufferParam) {
                let depthbuffer = this.createRenderbuffer(width, height, depthBufferParam.internalFormat, renderTarget._samples);
                renderTarget._depthbuffer = depthbuffer;
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            return renderTarget;
        }
        createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            multiSamples = 1;
            let texture = this.createRenderTextureCubeInternal(Laya.TextureDimension.Cube, size, colorFormat, generateMipmap, sRGB);
            let renderTarget = new WebGLInternalRT(this._engine, colorFormat, depthStencilFormat, true, texture.mipmap, multiSamples);
            renderTarget.gpuMemory = this.getGLRTTexMemory(size, size, colorFormat, depthStencilFormat, generateMipmap, multiSamples, true);
            renderTarget._textures.push(texture);
            let framebuffer = renderTarget._framebuffer;
            let gl = renderTarget._gl;
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
            if (depthBufferParam) {
                let depthbuffer = this.createRenderbuffer(size, size, depthBufferParam.internalFormat, renderTarget._samples);
                renderTarget._depthbuffer = depthbuffer;
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            return renderTarget;
        }
        createRenderbuffer(width, height, internalFormat, samples) {
            let gl = this._gl;
            let renderbuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, internalFormat, width, height);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            return renderbuffer;
        }
        createRenderTextureInternal(dimension, width, height, format, generateMipmap, sRGB) {
            let useSRGBExt = false;
            generateMipmap = generateMipmap && this.supportGenerateMipmap(format);
            let gammaCorrection = 1.0;
            let target = this.getTarget(dimension);
            let internalTex = new WebGLInternalTex(this._engine, target, width, height, 1, dimension, generateMipmap, useSRGBExt, gammaCorrection);
            let glParam = this.glRenderTextureParam(format, useSRGBExt);
            internalTex.internalFormat = glParam.internalFormat;
            internalTex.format = glParam.format;
            internalTex.type = glParam.type;
            let internalFormat = internalTex.internalFormat;
            let glFormat = internalTex.format;
            let type = internalTex.type;
            let gl = internalTex._gl;
            this._engine._bindTexture(internalTex.target, internalTex.resource);
            gl.texImage2D(target, 0, internalFormat, width, height, 0, glFormat, type, null);
            this._engine._bindTexture(internalTex.target, null);
            if (format == Laya.RenderTargetFormat.DEPTH_16 || format == Laya.RenderTargetFormat.DEPTH_32 || format == Laya.RenderTargetFormat.DEPTHSTENCIL_24_8) {
                internalTex.filterMode = Laya.FilterMode.Point;
            }
            return internalTex;
        }
        createRenderTargetDepthTexture(renderTarget, dimension, width, height) {
            let gl = renderTarget._gl;
            if (renderTarget.depthStencilFormat == Laya.RenderTargetFormat.None) {
                return null;
            }
            let depthbuffer = renderTarget._depthbuffer;
            depthbuffer && gl.deleteRenderbuffer(depthbuffer);
            renderTarget._depthbuffer = null;
            let format = renderTarget.depthStencilFormat;
            let mipmap = renderTarget._generateMipmap;
            let sRGB = renderTarget.isSRGB;
            if (renderTarget._depthTexture) {
                gl.deleteTexture(renderTarget._depthTexture);
            }
            let texture = this.createRenderTextureInternal(dimension, width, height, format, mipmap, sRGB);
            renderTarget._depthTexture = texture;
            let attachment = this.glRenderTargetAttachment(renderTarget.depthStencilFormat);
            let framebuffer = renderTarget._framebuffer;
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, attachment, gl.TEXTURE_2D, texture.resource, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            return texture;
        }
        readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out) {
            let gl = renderTarget._gl;
            this.bindRenderTarget(renderTarget);
            let frameState = gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE;
            if (!frameState) {
                this.unbindRenderTarget(renderTarget);
                return null;
            }
            switch (renderTarget.colorFormat) {
                case Laya.RenderTargetFormat.R8G8B8:
                    gl.readPixels(xOffset, yOffset, width, height, gl.RGB, gl.UNSIGNED_BYTE, out);
                    break;
                case Laya.RenderTargetFormat.R8G8B8A8:
                    gl.readPixels(xOffset, yOffset, width, height, gl.RGBA, gl.UNSIGNED_BYTE, out);
                    break;
                case Laya.RenderTargetFormat.R16G16B16:
                    gl.readPixels(xOffset, yOffset, width, height, gl.RGB, gl.FLOAT, out);
                    break;
                case Laya.RenderTargetFormat.R16G16B16A16:
                    gl.readPixels(xOffset, yOffset, width, height, gl.RGBA, gl.FLOAT, out);
                    break;
                case Laya.RenderTargetFormat.R32G32B32:
                    gl.readPixels(xOffset, yOffset, width, height, gl.RGB, gl.FLOAT, out);
                    break;
                case Laya.RenderTargetFormat.R32G32B32A32:
                    gl.readPixels(xOffset, yOffset, width, height, gl.RGBA, gl.FLOAT, out);
                    break;
            }
            this.unbindRenderTarget(renderTarget);
            return out;
        }
        readRenderTargetPixelDataAsync(renderTarget, xOffset, yOffset, width, height, out) {
            return Promise.resolve(this.readRenderTargetPixelData(renderTarget, xOffset, yOffset, width, height, out));
        }
        updateVideoTexture(texture, video, premultiplyAlpha, invertY) {
            let gl = texture._gl;
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            texture.width;
            texture.height;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texImage2D(target, 0, internalFormat, format, type, video);
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
    }

    class GL2TextureContext extends GLTextureContext {
        constructor(engine) {
            super(engine);
        }
        getTarget(dimension) {
            let target = -1;
            switch (dimension) {
                case Laya.TextureDimension.Cube:
                    target = this._gl.TEXTURE_CUBE_MAP;
                    break;
                case Laya.TextureDimension.Tex2D:
                    target = this._gl.TEXTURE_2D;
                    break;
                case Laya.TextureDimension.Texture2DArray:
                    target = this._gl.TEXTURE_2D_ARRAY;
                    break;
                case Laya.TextureDimension.Tex3D:
                    target = this._gl.TEXTURE_3D;
                    break;
                default:
                    throw "Unknow Texture Target";
            }
            return target;
        }
        glTextureParam(format, useSRGB) {
            let gl = this._gl;
            this._glParam.internalFormat = null;
            this._glParam.format = null;
            this._glParam.type = null;
            switch (format) {
                case Laya.TextureFormat.R8G8B8:
                    this._glParam.internalFormat = useSRGB ? gl.SRGB8 : gl.RGB8;
                    this._glParam.format = gl.RGB;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.R8G8B8A8:
                    this._glParam.internalFormat = useSRGB ? gl.SRGB8_ALPHA8 : gl.RGBA8;
                    this._glParam.format = gl.RGBA;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.TextureFormat.R5G6B5:
                    this._glParam.internalFormat = gl.RGB565;
                    this._glParam.format = gl.RGB;
                    this._glParam.type = gl.UNSIGNED_SHORT_5_6_5;
                    break;
                case Laya.TextureFormat.R32G32B32A32:
                    this._glParam.internalFormat = gl.RGBA32F;
                    this._glParam.format = gl.RGBA;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.TextureFormat.R32G32B32:
                    this._glParam.internalFormat = gl.RGB32F;
                    this._glParam.format = gl.RGB;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.TextureFormat.R16G16B16:
                    this._glParam.internalFormat = gl.RGB16F;
                    this._glParam.format = gl.RGB;
                    this._glParam.type = gl.HALF_FLOAT;
                    break;
                case Laya.TextureFormat.R16G16B16A16:
                    this._glParam.internalFormat = gl.RGBA16F;
                    this._glParam.format = gl.RGBA;
                    this._glParam.type = gl.HALF_FLOAT;
                    break;
                case Laya.TextureFormat.DXT1:
                    this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                    break;
                case Laya.TextureFormat.DXT3:
                    this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    break;
                case Laya.TextureFormat.DXT5:
                    this._glParam.internalFormat = useSRGB ? this._compressdTextureS3tc_srgb.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT : this._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    break;
                case Laya.TextureFormat.ETC1RGB:
                    this._glParam.internalFormat = this._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL;
                    break;
                case Laya.TextureFormat.ETC2RGBA:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGBA8_ETC2_EAC;
                    break;
                case Laya.TextureFormat.ETC2RGB:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGB8_ETC2;
                    break;
                case Laya.TextureFormat.ETC2SRGB:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_ETC2;
                    break;
                case Laya.TextureFormat.ETC2SRGB_Alpha8:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
                    break;
                case Laya.TextureFormat.ETC2RGB_Alpha1:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;
                    break;
                case Laya.TextureFormat.ETC2SRGB_Alpha1:
                    this._glParam.internalFormat = this._compressedTextureETC.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;
                    break;
                case Laya.TextureFormat.ASTC4x4:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_4x4_KHR;
                    break;
                case Laya.TextureFormat.ASTC6x6:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_6x6_KHR;
                    break;
                case Laya.TextureFormat.ASTC8x8:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_8x8_KHR;
                    break;
                case Laya.TextureFormat.ASTC10x10:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_10x10_KHR;
                    break;
                case Laya.TextureFormat.ASTC12x12:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_RGBA_ASTC_12x12_KHR;
                    break;
                case Laya.TextureFormat.ASTC4x4SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
                    break;
                case Laya.TextureFormat.ASTC6x6SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
                    break;
                case Laya.TextureFormat.ASTC8x8SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
                    break;
                case Laya.TextureFormat.ASTC10x10SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
                    break;
                case Laya.TextureFormat.ASTC12x12SRGB:
                    this._glParam.internalFormat = this._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;
                    break;
                default:
                    throw "Unknown Texture Format.";
            }
            return this._glParam;
        }
        glRenderBufferParam(format, useSRGB) {
            let gl = this._gl;
            switch (format) {
                case Laya.RenderTargetFormat.DEPTH_16:
                    return { internalFormat: gl.DEPTH_COMPONENT16, attachment: gl.DEPTH_ATTACHMENT };
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    return { internalFormat: gl.DEPTH24_STENCIL8, attachment: gl.DEPTH_STENCIL_ATTACHMENT };
                case Laya.RenderTargetFormat.DEPTH_32:
                    return { internalFormat: gl.DEPTH_COMPONENT32F, attachment: gl.DEPTH_ATTACHMENT };
                case Laya.RenderTargetFormat.STENCIL_8:
                    return { internalFormat: gl.STENCIL_INDEX8, attachment: gl.STENCIL_ATTACHMENT };
                case Laya.RenderTargetFormat.R8G8B8:
                    return { internalFormat: useSRGB ? gl.SRGB8 : gl.RGB8, attachment: gl.COLOR_ATTACHMENT0 };
                case Laya.RenderTargetFormat.R8G8B8A8:
                    return { internalFormat: useSRGB ? gl.SRGB8_ALPHA8 : gl.RGBA8, attachment: gl.COLOR_ATTACHMENT0 };
                case Laya.RenderTargetFormat.R16G16B16:
                    return { internalFormat: gl.RGB16F, attachment: gl.COLOR_ATTACHMENT0 };
                case Laya.RenderTargetFormat.R16G16B16A16:
                    return { internalFormat: gl.RGBA16F, attachment: gl.COLOR_ATTACHMENT0 };
                case Laya.RenderTargetFormat.R32G32B32:
                    return { internalFormat: gl.RGB32F, attachment: gl.COLOR_ATTACHMENT0 };
                case Laya.RenderTargetFormat.R32G32B32A32:
                    return { internalFormat: gl.RGBA32F, attachment: gl.COLOR_ATTACHMENT0 };
                default:
                    return null;
            }
        }
        glRenderTextureParam(format, useSRGB) {
            let gl = this._gl;
            this._glParam.internalFormat = null;
            this._glParam.format = null;
            this._glParam.type = null;
            switch (format) {
                case Laya.RenderTargetFormat.R8G8B8:
                    this._glParam.internalFormat = useSRGB ? gl.SRGB8 : gl.RGB8;
                    this._glParam.format = gl.RGB;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.RenderTargetFormat.R8G8B8A8:
                    this._glParam.internalFormat = useSRGB ? gl.SRGB8_ALPHA8 : gl.RGBA8;
                    this._glParam.format = gl.RGBA;
                    this._glParam.type = gl.UNSIGNED_BYTE;
                    break;
                case Laya.RenderTargetFormat.R16G16B16:
                    this._glParam.internalFormat = gl.RGB16F;
                    this._glParam.format = gl.RGB;
                    this._glParam.type = gl.HALF_FLOAT;
                    break;
                case Laya.RenderTargetFormat.R16G16B16A16:
                    this._glParam.internalFormat = gl.RGBA16F;
                    this._glParam.format = gl.RGBA;
                    this._glParam.type = gl.HALF_FLOAT;
                    break;
                case Laya.RenderTargetFormat.R32G32B32:
                    this._glParam.internalFormat = gl.RGB32F;
                    this._glParam.format = gl.RGB;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.RenderTargetFormat.R32G32B32A32:
                    this._glParam.internalFormat = gl.RGBA32F;
                    this._glParam.format = gl.RGBA;
                    this._glParam.type = gl.FLOAT;
                    break;
                case Laya.RenderTargetFormat.DEPTH_16:
                    this._glParam.internalFormat = gl.DEPTH_COMPONENT16;
                    this._glParam.format = gl.DEPTH_COMPONENT;
                    this._glParam.type = gl.UNSIGNED_INT;
                    break;
                case Laya.RenderTargetFormat.DEPTHSTENCIL_24_8:
                    this._glParam.internalFormat = gl.DEPTH24_STENCIL8;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_INT_24_8;
                    break;
                case Laya.RenderTargetFormat.DEPTH_32:
                    this._glParam.internalFormat = gl.DEPTH_COMPONENT32F;
                    this._glParam.format = this._glParam.internalFormat;
                    this._glParam.type = gl.UNSIGNED_INT;
                    break;
                case Laya.RenderTargetFormat.STENCIL_8:
                    break;
                default:
                    throw "depth texture format wrong.";
            }
            return this._glParam;
        }
        getGLtexMemory(tex, depth = 1) {
            let gl = this._gl;
            let channels = 0;
            let singlebyte = 0;
            let bytelength = 0;
            switch (tex.internalFormat) {
                case gl.SRGB8:
                case gl.RGB8:
                case gl.RGB565:
                case gl.RGB32F:
                case gl.RGB16F:
                    channels = 3;
                    break;
                case gl.SRGB8_ALPHA8:
                case gl.RGBA8:
                case gl.RGBA32F:
                case gl.RGBA16F:
                    channels = 4;
                    break;
                default:
                    channels = 0;
                    break;
            }
            switch (tex.type) {
                case gl.UNSIGNED_BYTE:
                    singlebyte = 1;
                    break;
                case gl.UNSIGNED_SHORT_5_6_5:
                    singlebyte = 2 / 3;
                    break;
                case gl.FLOAT:
                    singlebyte = 4;
                    break;
                case gl.HALF_FLOAT:
                    singlebyte = 2;
                    break;
                default:
                    singlebyte = 0;
                    break;
            }
            bytelength = channels * singlebyte * tex.width * tex.height;
            if (tex.mipmap) {
                bytelength *= 1.333;
            }
            if (tex.target == gl.TEXTURE_CUBE_MAP)
                bytelength *= 6;
            else if (tex.target == gl.TEXTURE_2D)
                bytelength *= 1;
            else if (tex.target == gl.TEXTURE_2D_ARRAY)
                bytelength *= depth;
            return bytelength;
        }
        supportSRGB(format, mipmap) {
            switch (format) {
                case Laya.TextureFormat.R8G8B8:
                    return this._engine.getCapable(Laya.RenderCapable.Texture_SRGB) && !mipmap;
                case Laya.TextureFormat.R8G8B8A8:
                    return this._engine.getCapable(Laya.RenderCapable.Texture_SRGB);
                case Laya.TextureFormat.DXT1:
                case Laya.TextureFormat.DXT3:
                case Laya.TextureFormat.DXT5:
                    return this._engine.getCapable(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB) && !mipmap;
                default:
                    return false;
            }
        }
        setTextureImageData(texture, source, premultiplyAlpha, invertY) {
            if (texture.width != source.width || texture.height != source.height) {
                console.warn("setTextureImageData: size not match");
            }
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let mipmapCount = texture.mipmapCount;
            let gl = this._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texStorage2D(target, mipmapCount, internalFormat, width, height);
            gl.texSubImage2D(target, 0, 0, 0, width, height, format, type, source);
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        setTextureSubImageData(texture, source, x, y, premultiplyAlpha, invertY) {
            let target = texture.target;
            texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            texture.width;
            texture.height;
            texture.mipmapCount;
            let gl = this._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texSubImage2D(target, 0, x, y, source.width, source.height, format, type, source);
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        setTexturePixelsData(texture, source, premultiplyAlpha, invertY) {
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let mipmapCount = texture.mipmapCount;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = this._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texStorage2D(target, mipmapCount, internalFormat, width, height);
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (source) {
                gl.texSubImage2D(target, 0, 0, 0, width, height, format, type, source);
                if (texture.mipmap) {
                    gl.generateMipmap(texture.target);
                }
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        createTexture3DInternal(dimension, width, height, depth, format, generateMipmap, sRGB, premultipliedAlpha) {
            let useSRGBExt = this.isSRGBFormat(format) || (sRGB && this.supportSRGB(format, generateMipmap));
            if (premultipliedAlpha) {
                useSRGBExt = false;
            }
            let gammaCorrection = 1.0;
            if (!useSRGBExt && sRGB) {
                gammaCorrection = 2.2;
            }
            let target = this.getTarget(dimension);
            let internalTex = new WebGLInternalTex(this._engine, target, width, height, depth, dimension, generateMipmap, useSRGBExt, gammaCorrection);
            let glParam = this.glTextureParam(format, useSRGBExt);
            internalTex.internalFormat = glParam.internalFormat;
            internalTex.format = glParam.format;
            internalTex.type = glParam.type;
            return internalTex;
        }
        setTexture3DImageData(texture, sources, depth, premultiplyAlpha, invertY) {
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let mipmapCount = texture.mipmapCount;
            let gl = this._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texStorage3D(target, mipmapCount, internalFormat, width, height, depth);
            texture.gpuMemory = this.getGLtexMemory(texture, depth);
            for (let index = 0; index < depth; index++) {
                gl.texSubImage3D(target, 0, 0, 0, index, width, height, 1, format, type, sources[index]);
            }
            texture.gpuMemory = this.getGLtexMemory(texture);
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        setTexture3DPixelsData(texture, source, depth, premultiplyAlpha, invertY) {
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let mipmapCount = texture.mipmapCount;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = this._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texStorage3D(target, mipmapCount, internalFormat, width, height, depth);
            texture.gpuMemory = this.getGLtexMemory(texture, depth);
            if (source) {
                gl.texSubImage3D(target, 0, 0, 0, 0, width, height, depth, format, type, source);
                if (texture.mipmap) {
                    gl.generateMipmap(texture.target);
                }
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTexture3DSubPixelsData(texture, source, mipmapLevel, generateMipmap, xOffset, yOffset, zOffset, width, height, depth, premultiplyAlpha, invertY) {
            generateMipmap = generateMipmap && mipmapLevel == 0;
            let target = texture.target;
            texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = this._gl;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texSubImage3D(target, mipmapLevel, xOffset, yOffset, zOffset, width, height, depth, format, type, source);
            if (texture.mipmap && generateMipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTextureHDRData(texture, hdrInfo) {
            let sourceData = hdrInfo.readScanLine();
            this.setTexturePixelsData(texture, sourceData, false, false);
        }
        setTextureKTXData(texture, ktxInfo) {
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let mipmapCount = texture.mipmapCount;
            let width = texture.width;
            let height = texture.height;
            texture.maxMipmapLevel = mipmapCount - 1;
            let source = ktxInfo.source;
            let compressed = ktxInfo.compress;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            let gl = this._gl;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            if (!compressed) {
                gl.texStorage2D(target, ktxInfo.mipmapCount, internalFormat, width, height);
            }
            let mipmapWidth = width;
            let mipmapHeight = height;
            let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
            let memory = 0;
            for (let index = 0; index < ktxInfo.mipmapCount; index++) {
                let imageSize = new Int32Array(source, dataOffset, 1)[0];
                dataOffset += 4;
                if (compressed) {
                    let sourceData = new Uint8Array(source, dataOffset, imageSize);
                    gl.compressedTexImage2D(target, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);
                    memory += sourceData.length;
                }
                else {
                    let pixelParams = this.getFormatPixelsParams(ktxInfo.format);
                    let typedSize = imageSize / pixelParams.typedSize;
                    let sourceData = new pixelParams.dataTypedCons(source, dataOffset, typedSize);
                    gl.texSubImage2D(target, index, 0, 0, mipmapWidth, mipmapHeight, format, type, sourceData);
                    memory += sourceData.length;
                }
                dataOffset += imageSize;
                dataOffset += 3 - ((imageSize + 3) % 4);
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            this._engine._bindTexture(texture.target, null);
            texture.gpuMemory = memory;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setCubeImageData(texture, sources, premultiplyAlpha, invertY) {
            let gl = this._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            ];
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let mipmapCount = texture.mipmapCount;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texStorage2D(target, mipmapCount, internalFormat, width, height);
            texture.gpuMemory = this.getGLtexMemory(texture);
            for (let index = 0; index < cubeFace.length; index++) {
                let t = cubeFace[index];
                gl.texSubImage2D(t, 0, 0, 0, format, type, sources[index]);
            }
            if (texture.mipmap) {
                gl.generateMipmap(texture.target);
            }
            this._engine._bindTexture(texture.target, null);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        }
        setCubePixelsData(texture, source, premultiplyAlpha, invertY) {
            let gl = this._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
            ];
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let width = texture.width;
            let height = texture.height;
            let mipmapCount = texture.mipmapCount;
            let fourSize = width % 4 == 0;
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            gl.texStorage2D(target, mipmapCount, internalFormat, width, height);
            if (source) {
                for (let index = 0; index < cubeFace.length; index++) {
                    let t = cubeFace[index];
                    gl.texSubImage2D(t, 0, 0, 0, width, height, format, type, source[index]);
                }
                if (texture.mipmap) {
                    gl.generateMipmap(texture.target);
                }
            }
            this._engine._bindTexture(texture.target, null);
            texture.gpuMemory = this.getGLtexMemory(texture);
            premultiplyAlpha && gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
            invertY && gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setCubeKTXData(texture, ktxInfo) {
            let gl = this._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            ];
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            texture.mipmapCount;
            let width = texture.width;
            let height = texture.height;
            texture.maxMipmapLevel = ktxInfo.mipmapCount - 1;
            let source = ktxInfo.source;
            let compressed = ktxInfo.compress;
            let mipmapWidth = width;
            let mipmapHeight = height;
            let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            if (!compressed) {
                gl.texStorage2D(target, ktxInfo.mipmapCount, internalFormat, width, height);
            }
            let memory = 0;
            for (let index = 0; index < ktxInfo.mipmapCount; index++) {
                let imageSize = new Int32Array(source, dataOffset, 1)[0];
                dataOffset += 4;
                for (let face = 0; face < 6; face++) {
                    let t = cubeFace[face];
                    if (compressed) {
                        let sourceData = new Uint8Array(source, dataOffset, imageSize);
                        gl.compressedTexImage2D(t, index, internalFormat, mipmapWidth, mipmapHeight, 0, sourceData);
                        memory += sourceData.byteLength;
                    }
                    else {
                        let pixelParams = this.getFormatPixelsParams(ktxInfo.format);
                        let typedSize = imageSize / pixelParams.typedSize;
                        let sourceData = new pixelParams.dataTypedCons(source, dataOffset, typedSize);
                        gl.texSubImage2D(t, index, 0, 0, mipmapWidth, mipmapHeight, format, type, sourceData);
                        memory += sourceData.byteLength;
                    }
                    dataOffset += imageSize;
                    dataOffset += 3 - ((imageSize + 3) % 4);
                }
                mipmapWidth = Math.max(1, mipmapWidth * 0.5);
                mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            }
            texture.gpuMemory = memory;
            this._engine._bindTexture(texture.target, null);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        getCubeKTXRGBMData(texture, ktxInfo) {
            let gl = this._gl;
            const cubeFace = [
                gl.TEXTURE_CUBE_MAP_POSITIVE_X,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
                gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
                gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
            ];
            let target = texture.target;
            let internalFormat = texture.internalFormat;
            let format = texture.format;
            let type = texture.type;
            let mipmapCount = texture.mipmapCount;
            let width = texture.width;
            let height = texture.height;
            texture.maxMipmapLevel = mipmapCount - 1;
            let source = ktxInfo.source;
            let compressed = ktxInfo.compress;
            let mipmapWidth = width;
            let mipmapHeight = height;
            let dataOffset = ktxInfo.headerOffset + ktxInfo.bytesOfKeyValueData;
            let fourSize = width % 4 == 0 && height % 4 == 0;
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
            this._engine._bindTexture(texture.target, texture.resource);
            if (!compressed) {
                gl.texStorage2D(target, ktxInfo.mipmapCount, internalFormat, width, height);
            }
            let memory = 0;
            for (let index = 0; index < ktxInfo.mipmapCount; index++) {
                let imageSize = new Int32Array(source, dataOffset, 1)[0];
                dataOffset += 4;
                for (let face = 0; face < 6; face++) {
                    let t = cubeFace[face];
                    let pixelParams = this.getFormatPixelsParams(ktxInfo.format);
                    let typedSize = imageSize / pixelParams.typedSize;
                    let sourceData = new pixelParams.dataTypedCons(source, dataOffset, typedSize);
                    gl.texSubImage2D(t, index, 0, 0, mipmapWidth, mipmapHeight, format, type, sourceData);
                    memory += sourceData.byteLength;
                }
                dataOffset += imageSize;
                dataOffset += 3 - ((imageSize + 3) % 4);
            }
            mipmapWidth = Math.max(1, mipmapWidth * 0.5);
            mipmapHeight = Math.max(1, mipmapHeight * 0.5);
            texture.gpuMemory = memory;
            this._engine._bindTexture(texture.target, null);
            fourSize || gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4);
        }
        setTextureCompareMode(texture, compareMode) {
            let gl = this._gl;
            switch (compareMode) {
                case Laya.TextureCompareMode.LEQUAL:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.GEQUAL:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.GEQUAL);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.LESS:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.LESS);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.GREATER:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.GREATER);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.EQUAL:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.EQUAL);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.NOTEQUAL:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.NOTEQUAL);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.ALWAYS:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.ALWAYS);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.NEVER:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.NEVER);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE);
                    break;
                case Laya.TextureCompareMode.None:
                default:
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL);
                    texture._setTexParameteri(gl.TEXTURE_COMPARE_MODE, gl.NONE);
                    break;
            }
            return compareMode;
        }
        createRenderbuffer(width, height, internalFormat, samples) {
            let gl = this._gl;
            let renderbuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
            if (samples > 1) {
                gl.renderbufferStorageMultisample(gl.RENDERBUFFER, samples, internalFormat, width, height);
            }
            else {
                gl.renderbufferStorage(gl.RENDERBUFFER, internalFormat, width, height);
            }
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
            return renderbuffer;
        }
        createRenderTextureInternal(dimension, width, height, format, generateMipmap, sRGB) {
            generateMipmap = generateMipmap && this.supportGenerateMipmap(format);
            let useSRGBExt = this.isSRGBFormat(format) || (sRGB && this.supportSRGB(format, generateMipmap));
            let gammaCorrection = 1.0;
            let target = this.getTarget(dimension);
            let internalTex = new WebGLInternalTex(this._engine, target, width, height, 1, dimension, generateMipmap, useSRGBExt, gammaCorrection);
            let glParam = this.glRenderTextureParam(format, useSRGBExt);
            internalTex.internalFormat = glParam.internalFormat;
            internalTex.format = glParam.format;
            internalTex.type = glParam.type;
            let internalFormat = internalTex.internalFormat;
            internalTex.format;
            internalTex.type;
            let gl = this._gl;
            this._engine._bindTexture(internalTex.target, internalTex.resource);
            gl.texStorage2D(target, internalTex.mipmapCount, internalFormat, width, height);
            this._engine._bindTexture(internalTex.target, null);
            if (format == Laya.RenderTargetFormat.DEPTH_16 || format == Laya.RenderTargetFormat.DEPTH_32 || format == Laya.RenderTargetFormat.DEPTHSTENCIL_24_8) {
                internalTex.filterMode = Laya.FilterMode.Point;
            }
            return internalTex;
        }
        createRenderTargetInternal(width, height, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            let texture = this.createRenderTextureInternal(Laya.TextureDimension.Tex2D, width, height, colorFormat, generateMipmap, sRGB);
            let renderTarget = new WebGLInternalRT(this._engine, colorFormat, depthStencilFormat, false, texture.mipmap, multiSamples);
            renderTarget.gpuMemory = this.getGLRTTexMemory(width, height, colorFormat, depthStencilFormat, generateMipmap, multiSamples, false);
            renderTarget._textures.push(texture);
            let gl = renderTarget._gl;
            if (renderTarget._samples > 1) {
                let msaaFramebuffer = renderTarget._msaaFramebuffer;
                let renderbufferParam = this.glRenderBufferParam(colorFormat, sRGB);
                let msaaRenderbuffer = renderTarget._msaaRenderbuffer = this.createRenderbuffer(width, height, renderbufferParam.internalFormat, renderTarget._samples);
                gl.bindFramebuffer(gl.FRAMEBUFFER, msaaFramebuffer);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, renderbufferParam.attachment, gl.RENDERBUFFER, msaaRenderbuffer);
                let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
                if (depthBufferParam) {
                    let depthbuffer = this.createRenderbuffer(width, height, depthBufferParam.internalFormat, renderTarget._samples);
                    renderTarget._depthbuffer = depthbuffer;
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
                }
                gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
                let framebuffer = renderTarget._framebuffer;
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                let colorAttachment = this.glRenderTargetAttachment(colorFormat);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment, gl.TEXTURE_2D, texture.resource, 0);
                gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            }
            else {
                let framebuffer = renderTarget._framebuffer;
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                let colorAttachment = this.glRenderTargetAttachment(colorFormat);
                gl.framebufferTexture2D(gl.FRAMEBUFFER, colorAttachment, gl.TEXTURE_2D, texture.resource, 0);
                let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
                if (depthBufferParam) {
                    let depthbuffer = this.createRenderbuffer(width, height, depthBufferParam.internalFormat, renderTarget._samples);
                    renderTarget._depthbuffer = depthbuffer;
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
                }
                gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            }
            return renderTarget;
        }
        createRenderTargetCubeInternal(size, colorFormat, depthStencilFormat, generateMipmap, sRGB, multiSamples) {
            let texture = this.createRenderTextureCubeInternal(Laya.TextureDimension.Cube, size, colorFormat, generateMipmap, sRGB);
            let renderTarget = new WebGLInternalRT(this._engine, colorFormat, depthStencilFormat, true, texture.mipmap, multiSamples);
            renderTarget.gpuMemory = this.getGLRTTexMemory(size, size, colorFormat, depthStencilFormat, generateMipmap, multiSamples, true);
            renderTarget.colorFormat = colorFormat;
            renderTarget.depthStencilFormat = depthStencilFormat;
            renderTarget._textures.push(texture);
            renderTarget.isSRGB = sRGB;
            let gl = renderTarget._gl;
            if (renderTarget._samples > 1) {
                let msaaFramebuffer = renderTarget._msaaFramebuffer;
                let renderbufferParam = this.glRenderBufferParam(colorFormat, false);
                let msaaRenderbuffer = renderTarget._msaaRenderbuffer = this.createRenderbuffer(size, size, renderbufferParam.internalFormat, renderTarget._samples);
                gl.bindFramebuffer(gl.FRAMEBUFFER, msaaFramebuffer);
                gl.framebufferRenderbuffer(gl.FRAMEBUFFER, renderbufferParam.attachment, gl.RENDERBUFFER, msaaRenderbuffer);
                let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
                if (depthBufferParam) {
                    let depthbuffer = this.createRenderbuffer(size, size, depthBufferParam.internalFormat, renderTarget._samples);
                    renderTarget._depthbuffer = depthbuffer;
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
                }
                gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            }
            else {
                let framebuffer = renderTarget._framebuffer;
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                let depthBufferParam = this.glRenderBufferParam(depthStencilFormat, false);
                if (depthBufferParam) {
                    let depthbuffer = this.createRenderbuffer(size, size, depthBufferParam.internalFormat, renderTarget._samples);
                    renderTarget._depthbuffer = depthbuffer;
                    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, depthBufferParam.attachment, gl.RENDERBUFFER, depthbuffer);
                }
                gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            }
            return renderTarget;
        }
        createRenderTextureCubeInternal(dimension, size, format, generateMipmap, sRGB) {
            generateMipmap = generateMipmap && this.supportGenerateMipmap(format);
            let useSRGBExt = this.isSRGBFormat(format) || (sRGB && this.supportSRGB(format, generateMipmap));
            let gammaCorrection = 1.0;
            let target = this.getTarget(dimension);
            let internalTex = new WebGLInternalTex(this._engine, target, size, size, 1, dimension, generateMipmap, useSRGBExt, gammaCorrection);
            let glParam = this.glRenderTextureParam(format, useSRGBExt);
            internalTex.internalFormat = glParam.internalFormat;
            internalTex.format = glParam.format;
            internalTex.type = glParam.type;
            let internalFormat = internalTex.internalFormat;
            internalTex.format;
            internalTex.type;
            let gl = this._gl;
            this._engine._bindTexture(internalTex.target, internalTex.resource);
            gl.texStorage2D(target, internalTex.mipmapCount, internalFormat, size, size);
            this._engine._bindTexture(internalTex.target, null);
            return internalTex;
        }
        bindRenderTarget(renderTarget, faceIndex = 0) {
            this.currentActiveRT && this.unbindRenderTarget(this.currentActiveRT);
            let gl = this._gl;
            if (renderTarget._isCube) {
                let framebuffer = renderTarget._framebuffer;
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
                let texture = renderTarget._textures[0];
                gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, texture.resource, 0);
            }
            if (renderTarget._samples > 1) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget._msaaFramebuffer);
            }
            else {
                let framebuffer = renderTarget._framebuffer;
                gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            }
            this.currentActiveRT = renderTarget;
        }
        unbindRenderTarget(renderTarget) {
            let gl = this._gl;
            if (renderTarget && renderTarget._samples > 1) {
                gl.bindFramebuffer(gl.READ_FRAMEBUFFER, renderTarget._msaaFramebuffer);
                gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, renderTarget._framebuffer);
                let texture = renderTarget._textures[0];
                let biltMask = gl.COLOR_BUFFER_BIT;
                if (renderTarget._depthTexture) {
                    biltMask |= gl.DEPTH_BUFFER_BIT;
                }
                gl.blitFramebuffer(0, 0, texture.width, texture.height, 0, 0, texture.width, texture.height, biltMask, gl.NEAREST);
            }
            if (renderTarget && renderTarget._generateMipmap) {
                renderTarget._textures.forEach(tex => {
                    let target = tex.target;
                    this._engine._bindTexture(target, tex.resource);
                    gl.generateMipmap(target);
                    this._engine._bindTexture(target, null);
                });
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, WebGLEngine._lastFrameBuffer_WebGLOBJ);
            this.currentActiveRT = WebGLEngine._lastFrameBuffer;
        }
    }

    class GLBuffer extends GLObject {
        constructor(engine, targetType, bufferUsageType) {
            super(engine);
            this._byteLength = 0;
            this._glTargetType = targetType;
            this._glBufferUsageType = bufferUsageType;
            this._getGLTarget(this._glTargetType);
            this._getGLUsage(this._glBufferUsageType);
            this._glBuffer = this._gl.createBuffer();
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_GPUBuffer, 1);
        }
        _getGLUsage(usage) {
            switch (usage) {
                case Laya.BufferUsage.Static:
                    this._glUsage = this._gl.STATIC_DRAW;
                    break;
                case Laya.BufferUsage.Dynamic:
                    this._glUsage = this._gl.DYNAMIC_DRAW;
                    break;
                case Laya.BufferUsage.Stream:
                    this._glUsage = this._gl.STREAM_DRAW;
                    break;
                default:
                    console.error("usage is not standard");
                    break;
            }
        }
        _getGLTarget(target) {
            switch (target) {
                case Laya.BufferTargetType.ARRAY_BUFFER:
                    this._glTarget = this._gl.ARRAY_BUFFER;
                    break;
                case Laya.BufferTargetType.UNIFORM_BUFFER:
                    this._glTarget = this._gl.UNIFORM_BUFFER;
                    break;
                case Laya.BufferTargetType.ELEMENT_ARRAY_BUFFER:
                    this._glTarget = this._gl.ELEMENT_ARRAY_BUFFER;
                    break;
            }
        }
        _memorychange(bytelength) {
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_GPUBuffer, -this._byteLength + bytelength);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_GPUMemory, -this._byteLength + bytelength);
        }
        bindBuffer() {
            if (this._engine._getbindBuffer(this._glTargetType) != this) {
                this._gl.bindBuffer(this._glTarget, this._glBuffer);
                this._engine._setbindBuffer(this._glTargetType, this);
                return true;
            }
            return false;
        }
        unbindBuffer() {
            if (this._engine._getbindBuffer(this._glTargetType) == this) {
                this._gl.bindBuffer(this._glTarget, null);
                this._engine._setbindBuffer(this._glTargetType, null);
            }
        }
        orphanStorage() {
            this.bindBuffer();
            this.setDataLength(this._byteLength);
        }
        setDataLength(srcData) {
            let gl = this._gl;
            this.bindBuffer();
            this._memorychange(srcData);
            this._byteLength = srcData;
            gl.bufferData(this._glTarget, this._byteLength, this._glUsage);
            this.unbindBuffer();
        }
        setData(srcData, offset) {
            let gl = this._gl;
            this.bindBuffer();
            gl.bufferSubData(this._glTarget, offset, srcData);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_GeometryBufferUploadCount, 1);
            this.unbindBuffer();
        }
        setDataEx(srcData, offset, length) {
            let gl = this._gl;
            this.bindBuffer();
            gl.bufferSubData(this._glTarget, offset, srcData, 0, length);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_GeometryBufferUploadCount, 1);
            this.unbindBuffer();
        }
        bindBufferBase(glPointer) {
            if (this._engine._getBindUBOBuffer(glPointer) != this) {
                const gl = this._gl;
                gl.bindBufferBase(this._glTarget, glPointer, this._glBuffer);
                this._engine._setBindUBOBuffer(glPointer, this);
            }
        }
        bindBufferRange(glPointer, offset, byteCount) {
            const gl = this._gl;
            gl.bindBufferRange(this._glTarget, glPointer, this._glBuffer, offset, byteCount);
        }
        resizeBuffer(dataLength) {
            this.bindBuffer();
            const gl = this._gl;
            this._byteLength = dataLength;
            gl.bufferData(this._glTarget, this._byteLength, this._glUsage);
        }
        destroy() {
            super.destroy();
            const gl = this._gl;
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_GPUBuffer, -1);
            gl.deleteBuffer(this._glBuffer);
            this._memorychange(0);
            this._byteLength = 0;
            this._engine = null;
            this._glBuffer = null;
            this._glTarget = null;
            this._glUsage = null;
            this._gl = null;
        }
    }

    exports.WebGLMode = void 0;
    (function (WebGLMode) {
        WebGLMode[WebGLMode["Auto"] = 0] = "Auto";
        WebGLMode[WebGLMode["WebGL2"] = 1] = "WebGL2";
        WebGLMode[WebGLMode["WebGL1"] = 2] = "WebGL1";
    })(exports.WebGLMode || (exports.WebGLMode = {}));

    class GLParams {
        constructor(engine) {
            this._engine = engine;
            this._gl = this._engine.gl;
            this._initParams();
        }
        _initParams() {
            const gl = this._gl;
            this._glParamsData = new Map();
            this._glParamsData.set(Laya.RenderParams.Max_Active_Texture_Count, gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
            const maxVertexUniform = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
            const maxFragUniform = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
            this._glParamsData.set(Laya.RenderParams.Max_Uniform_Count, Math.min(maxVertexUniform, maxFragUniform));
            this._glParamsData.set(Laya.RenderParams.MAX_Texture_Size, gl.getParameter(gl.MAX_TEXTURE_SIZE));
            this._glParamsData.set(Laya.RenderParams.MAX_Texture_Image_Uint, gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
            if (this._engine.getCapable(Laya.RenderCapable.Texture_anisotropic)) {
                const anisoExt = this._engine._supportCapatable.getExtension(exports.WebGLExtension.EXT_texture_filter_anisotropic);
                this._glParamsData.set(Laya.RenderParams.Max_AnisoLevel_Count, gl.getParameter(anisoExt.MAX_TEXTURE_MAX_ANISOTROPY_EXT));
            }
            if (this._engine.isWebGL2)
                this._glParamsData.set(Laya.RenderParams.SHADER_CAPAILITY_LEVEL, 35);
            else
                this._glParamsData.set(Laya.RenderParams.SHADER_CAPAILITY_LEVEL, 30);
            this._glParamsData.set(Laya.RenderParams.FLOAT, gl.FLOAT);
            this._glParamsData.set(Laya.RenderParams.UNSIGNED_BYTE, gl.UNSIGNED_BYTE);
            this._glParamsData.set(Laya.RenderParams.UNSIGNED_SHORT, gl.UNSIGNED_SHORT);
            this._glParamsData.set(Laya.RenderParams.BYTE, gl.BYTE);
        }
        getParams(params) {
            return this._glParamsData.get(params);
        }
    }

    class GLRenderDrawContext extends GLObject {
        constructor(engine) {
            super(engine);
            if (!this._engine.isWebGL2) {
                this._angleInstancedArrays = this._engine._supportCapatable.getExtension(exports.WebGLExtension.ANGLE_instanced_arrays);
            }
        }
        getMeshTopology(mode) {
            switch (mode) {
                case Laya.MeshTopology.Points:
                    return this._gl.POINTS;
                case Laya.MeshTopology.Lines:
                    return this._gl.LINES;
                case Laya.MeshTopology.LineLoop:
                    return this._gl.LINE_LOOP;
                case Laya.MeshTopology.LineStrip:
                    return this._gl.LINE_STRIP;
                case Laya.MeshTopology.Triangles:
                    return this._gl.TRIANGLES;
                case Laya.MeshTopology.TriangleStrip:
                    return this._gl.TRIANGLE_STRIP;
                case Laya.MeshTopology.TriangleFan:
                    return this._gl.TRIANGLE_FAN;
            }
        }
        getIndexType(type) {
            switch (type) {
                case Laya.IndexFormat.UInt8:
                    return this._gl.UNSIGNED_BYTE;
                case Laya.IndexFormat.UInt16:
                    return this._gl.UNSIGNED_SHORT;
                case Laya.IndexFormat.UInt32:
                    return this._gl.UNSIGNED_INT;
            }
        }
        drawElementsInstanced(mode, count, type, offset, instanceCount) {
            if (this._engine.isWebGL2)
                this._gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
            else
                this._angleInstancedArrays.drawElementsInstancedANGLE(mode, count, type, offset, instanceCount);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_DrawCallCount, 1);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_Instancing_DrawCallCount, 1);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_TriangleCount, count / 3 * instanceCount);
        }
        drawArraysInstanced(mode, first, count, instanceCount) {
            if (this._engine.isWebGL2)
                this._gl.drawArraysInstanced(mode, first, count, instanceCount);
            else
                this._angleInstancedArrays.drawArraysInstancedANGLE(mode, first, count, instanceCount);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_DrawCallCount, 1);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_Instancing_DrawCallCount, 1);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_TriangleCount, (count - 2) * instanceCount);
        }
        drawArrays(mode, first, count) {
            this._gl.drawArrays(mode, first, count);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_DrawCallCount, 1);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_TriangleCount, (count - 2));
        }
        drawElements(mode, count, type, offset) {
            this._gl.drawElements(mode, count, type, offset);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_DrawCallCount, 1);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_TriangleCount, count / 3);
        }
        drawElements2DTemp(mode, count, type, offset) {
            mode = this.getMeshTopology(mode);
            type = this.getIndexType(type);
            this._gl.drawElements(mode, count, type, offset);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_DrawCallCount, 1);
            this._engine._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_TriangleCount, count / 3);
        }
        drawGeometryElement(geometryElement) {
            geometryElement.bufferState.bind();
            let element = geometryElement.drawParams.elements;
            let length = geometryElement.drawParams.length;
            switch (geometryElement.drawType) {
                case Laya.DrawType.DrawArray:
                    for (let i = 0; i < length; i += 2) {
                        this.drawArrays(geometryElement._glmode, element[i], element[i + 1]);
                    }
                    break;
                case Laya.DrawType.DrawElement:
                    for (let i = 0; i < length; i += 2) {
                        this.drawElements(geometryElement._glmode, element[i + 1], geometryElement._glindexFormat, element[i]);
                    }
                    break;
                case Laya.DrawType.DrawArrayInstance:
                    for (let i = 0; i < length; i += 2) {
                        this.drawArraysInstanced(geometryElement._glmode, element[i], element[i + 1], geometryElement.instanceCount);
                    }
                    break;
                case Laya.DrawType.DrawElementInstance:
                    for (let i = 0; i < length; i += 2) {
                        this.drawElementsInstanced(geometryElement._glmode, element[i + 1], geometryElement._glindexFormat, element[i], geometryElement.instanceCount);
                    }
                    break;
            }
        }
    }

    class GLRenderState {
        constructor(engine) {
            this._engine = engine;
            this._gl = this._engine.gl;
        }
        _initState() {
            this.setDepthFunc(Laya.CompareFunction.Less);
            this.setBlendEquationSeparate(Laya.BlendEquationSeparate.ADD, Laya.BlendEquationSeparate.ADD);
            this._blendEquation = Laya.BlendEquationSeparate.ADD;
            this._sFactor = Laya.BlendFactor.One;
            this._dFactor = Laya.BlendFactor.Zero;
            this._sFactorAlpha = Laya.BlendFactor.One;
            this._dFactorAlpha = Laya.BlendFactor.One;
        }
        _getBlendFactor(factor) {
            const gl = this._gl;
            switch (factor) {
                case Laya.BlendFactor.Zero:
                    return gl.ZERO;
                case Laya.BlendFactor.One:
                    return gl.ONE;
                case Laya.BlendFactor.SourceColor:
                    return gl.SRC_COLOR;
                case Laya.BlendFactor.OneMinusSourceColor:
                    return gl.ONE_MINUS_SRC_COLOR;
                case Laya.BlendFactor.DestinationColor:
                    return gl.DST_COLOR;
                case Laya.BlendFactor.OneMinusDestinationColor:
                    return gl.ONE_MINUS_DST_COLOR;
                case Laya.BlendFactor.SourceAlpha:
                    return gl.SRC_ALPHA;
                case Laya.BlendFactor.OneMinusSourceAlpha:
                    return gl.ONE_MINUS_SRC_ALPHA;
                case Laya.BlendFactor.DestinationAlpha:
                    return gl.DST_ALPHA;
                case Laya.BlendFactor.OneMinusDestinationAlpha:
                    return gl.ONE_MINUS_DST_ALPHA;
                case Laya.BlendFactor.SourceAlphaSaturate:
                    return gl.SRC_ALPHA_SATURATE;
                case Laya.BlendFactor.BlendColor:
                    return gl.CONSTANT_COLOR;
                case Laya.BlendFactor.OneMinusBlendColor:
                    return gl.ONE_MINUS_CONSTANT_COLOR;
            }
        }
        _getBlendOperation(factor) {
            const gl = this._gl;
            switch (factor) {
                case Laya.BlendEquationSeparate.ADD:
                    return gl.FUNC_ADD;
                case Laya.BlendEquationSeparate.SUBTRACT:
                    return gl.FUNC_SUBTRACT;
                case Laya.BlendEquationSeparate.REVERSE_SUBTRACT:
                    return gl.FUNC_REVERSE_SUBTRACT;
                default:
                    throw "Unknow type";
            }
        }
        _getGLCompareFunction(compareFunction) {
            const gl = this._gl;
            switch (compareFunction) {
                case Laya.CompareFunction.Never:
                    return gl.NEVER;
                case Laya.CompareFunction.Less:
                    return gl.LESS;
                case Laya.CompareFunction.Equal:
                    return gl.EQUAL;
                case Laya.CompareFunction.LessEqual:
                    return gl.LEQUAL;
                case Laya.CompareFunction.Greater:
                    return gl.GREATER;
                case Laya.CompareFunction.NotEqual:
                    return gl.NOTEQUAL;
                case Laya.CompareFunction.GreaterEqual:
                    return gl.GEQUAL;
                case Laya.CompareFunction.Always:
                    return gl.ALWAYS;
                default:
                    return gl.LEQUAL;
            }
        }
        _getGLStencilOperation(compareFunction) {
            const gl = this._gl;
            switch (compareFunction) {
                case Laya.StencilOperation.Keep:
                    return gl.KEEP;
                case Laya.StencilOperation.Zero:
                    return gl.ZERO;
                case Laya.StencilOperation.Replace:
                    return gl.REPLACE;
                case Laya.StencilOperation.IncrementSaturate:
                    return gl.INCR;
                case Laya.StencilOperation.DecrementSaturate:
                    return gl.DECR;
                case Laya.StencilOperation.Invert:
                    return gl.INVERT;
                case Laya.StencilOperation.IncrementWrap:
                    return gl.INCR_WRAP;
                case Laya.StencilOperation.DecrementWrap:
                    return gl.DECR_WRAP;
            }
        }
        _getGLFrontfaceFactor(cullmode) {
            if (cullmode == Laya.CullMode.Front)
                return this._gl.CCW;
            else
                return this._gl.CW;
        }
        setDepthTest(value) {
            value !== this._depthTest && (this._depthTest = value, value ? this._gl.enable(this._gl.DEPTH_TEST) : this._gl.disable(this._gl.DEPTH_TEST));
        }
        setDepthMask(value) {
            value !== this._depthMask && (this._depthMask = value, this._gl.depthMask(value));
        }
        setDepthFunc(value) {
            value !== this._depthFunc && (this._depthFunc = value, this._gl.depthFunc(this._getGLCompareFunction(value)));
        }
        setStencilTest(value) {
            value !== this._stencilTest && (this._stencilTest = value, value ? this._gl.enable(this._gl.STENCIL_TEST) : this._gl.disable(this._gl.STENCIL_TEST));
        }
        setStencilMask(value) {
            value !== this._stencilMask && (this._stencilMask = value, value ? this._gl.stencilMask(0xff) : this._gl.stencilMask(0x00));
        }
        setStencilFunc(fun, ref) {
            if (fun != this._stencilFunc || ref != this._stencilRef) {
                this._stencilFunc = fun;
                this._stencilRef = ref;
                this._gl.stencilFunc(this._getGLCompareFunction(fun), ref, 0xff);
            }
        }
        setstencilOp(fail, zfail, zpass) {
            if (this._stencilOp_fail != fail || this._stencilOp_zfail != zfail || this._stencilOp_zpass != zpass) {
                this._stencilOp_fail = fail;
                this._stencilOp_zfail = zfail;
                this._stencilOp_zpass = zpass;
                this._gl.stencilOp(this._getGLStencilOperation(fail), this._getGLStencilOperation(zfail), this._getGLStencilOperation(zpass));
            }
        }
        setBlend(value) {
            value !== this._blend && (this._blend = value, value ? this._gl.enable(this._gl.BLEND) : this._gl.disable(this._gl.BLEND));
        }
        setBlendEquation(blendEquation) {
            if (blendEquation !== this._blendEquation) {
                this._blendEquation = blendEquation;
                this._blendEquationRGB = this._blendEquationAlpha = null;
                this._gl.blendEquation(this._getBlendOperation(blendEquation));
            }
        }
        setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha) {
            if (blendEquationRGB !== this._blendEquationRGB || blendEquationAlpha !== this._blendEquationAlpha) {
                this._blendEquationRGB = blendEquationRGB;
                this._blendEquationAlpha = blendEquationAlpha;
                this._blendEquation = null;
                this._gl.blendEquationSeparate(this._getBlendOperation(blendEquationRGB), this._getBlendOperation(blendEquationAlpha));
            }
        }
        setBlendFunc(sFactor, dFactor, force = false) {
            if (force || sFactor !== this._sFactor || dFactor !== this._dFactor) {
                this._sFactor = sFactor;
                this._dFactor = dFactor;
                this._sFactorRGB = null;
                this._dFactorRGB = null;
                this._sFactorAlpha = null;
                this._dFactorAlpha = null;
                this._gl.blendFunc(this._getBlendFactor(sFactor), this._getBlendFactor(dFactor));
            }
        }
        setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha) {
            if (srcRGB !== this._sFactorRGB || dstRGB !== this._dFactorRGB || srcAlpha !== this._sFactorAlpha || dstAlpha !== this._dFactorAlpha) {
                this._sFactorRGB = srcRGB;
                this._dFactorRGB = dstRGB;
                this._sFactorAlpha = srcAlpha;
                this._dFactorAlpha = dstAlpha;
                this._sFactor = null;
                this._dFactor = null;
                this._gl.blendFuncSeparate(this._getBlendFactor(srcRGB), this._getBlendFactor(dstRGB), this._getBlendFactor(srcAlpha), this._getBlendFactor(dstAlpha));
            }
        }
        setCullFace(value) {
            value !== this._cullFace && (this._cullFace = value, value ? this._gl.enable(this._gl.CULL_FACE) : this._gl.disable(this._gl.CULL_FACE));
        }
        setFrontFace(value) {
            value !== this._frontFace && (this._frontFace = value, this._gl.frontFace(this._getGLFrontfaceFactor(value)));
        }
    }

    class GLShaderInstance extends GLObject {
        constructor(engine, vs, ps, attributeMap) {
            super(engine);
            this._complete = true;
            this._vs = vs;
            this._ps = ps;
            this._attributeMap = attributeMap;
            this._uniformMap = [];
            this._create();
        }
        _create() {
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_ShaderCompile, 1);
            let preTime = performance.now();
            const gl = this._gl;
            if (WebGLEngine.instance.lost) {
                console.log("lost webgl context");
                return;
            }
            this._program = gl.createProgram();
            this._vshader = this._createShader(gl, this._vs, gl.VERTEX_SHADER);
            this._pshader = this._createShader(gl, this._ps, gl.FRAGMENT_SHADER);
            gl.attachShader(this._program, this._vshader);
            gl.attachShader(this._program, this._pshader);
            for (var k in this._attributeMap)
                gl.bindAttribLocation(this._program, this._attributeMap[k][0], k);
            gl.linkProgram(this._program);
            const bo = gl.getProgramParameter(this._program, gl.LINK_STATUS);
            if (!bo) {
                var info = gl.getProgramInfoLog(this._program);
                console.error(new Error('Could not compile WebGL program. \n\n' + info));
                this._complete = false;
                return;
            }
            const nUniformNum = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
            this.useProgram();
            this._curActTexIndex = 0;
            let one, i;
            for (i = 0; i < nUniformNum; i++) {
                var uniformData = gl.getActiveUniform(this._program, i);
                var uniName = uniformData.name;
                let location = gl.getUniformLocation(this._program, uniName);
                if (!location && location != 0)
                    continue;
                one = new Laya.ShaderVariable();
                one.location = location;
                if (uniName.indexOf('[0]') > 0) {
                    one.name = uniName = uniName.substr(0, uniName.length - 3);
                    one.isArray = true;
                }
                else {
                    one.name = uniName;
                    one.isArray = false;
                }
                one.type = uniformData.type;
                this._addShaderUnifiormFun(one);
                this._uniformMap.push(one);
                one.dataOffset = this._engine.propertyNameToID(uniName);
            }
            if (this._engine.isWebGL2) {
                this._uniformObjectMap = {};
                var nUniformBlock = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORM_BLOCKS);
                for (i = 0; i < nUniformBlock; i++) {
                    let gl2 = gl;
                    var uniformBlockName = gl2.getActiveUniformBlockName(this._program, i);
                    one = new Laya.ShaderVariable();
                    one.name = uniformBlockName;
                    one.isArray = false;
                    one.type = gl.UNIFORM_BUFFER;
                    one.dataOffset = this._engine.propertyNameToID(uniformBlockName);
                    let location = one.location = gl2.getUniformBlockIndex(this._program, uniformBlockName);
                    gl2.uniformBlockBinding(this._program, location, this._engine.getUBOPointer(uniformBlockName));
                    this._uniformObjectMap[one.name] = one;
                    this._uniformMap.push(one);
                    this._addShaderUnifiormFun(one);
                }
            }
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.T_ShaderCompile, (performance.now() - preTime) | 0);
        }
        _legalUBObyteLength(bytelength) {
            return Math.ceil(bytelength / 16) * 16;
        }
        _createShader(gl, str, type) {
            var shader = gl.createShader(type);
            gl.shaderSource(shader, str);
            gl.compileShader(shader);
            if (this._engine._isShaderDebugMode && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                if (!Laya.LayaEnv.isPlaying) {
                    console.warn(gl.getShaderInfoLog(shader));
                }
                else {
                    console.error(gl.getShaderInfoLog(shader));
                }
            }
            return shader;
        }
        _addShaderUnifiormFun(one) {
            var gl = this._gl;
            one.caller = this;
            var isArray = one.isArray;
            switch (one.type) {
                case gl.BOOL:
                    one.fun = this._uniform1i;
                    one.uploadedValue = new Array(1);
                    break;
                case gl.INT:
                    one.fun = isArray ? this._uniform1iv : this._uniform1i;
                    one.uploadedValue = new Array(1);
                    break;
                case gl.FLOAT:
                    one.fun = isArray ? this._uniform1fv : this._uniform1f;
                    one.uploadedValue = new Array(1);
                    break;
                case gl.FLOAT_VEC2:
                    one.fun = isArray ? this._uniform_vec2v : this._uniform_vec2;
                    one.uploadedValue = new Array(2);
                    break;
                case gl.FLOAT_VEC3:
                    one.fun = isArray ? this._uniform_vec3v : this._uniform_vec3;
                    one.uploadedValue = new Array(3);
                    break;
                case gl.FLOAT_VEC4:
                    one.fun = isArray ? this._uniform_vec4v : this._uniform_vec4;
                    one.uploadedValue = new Array(4);
                    break;
                case gl.FLOAT_MAT2:
                    one.fun = this._uniformMatrix2fv;
                    break;
                case gl.FLOAT_MAT3:
                    one.fun = this._uniformMatrix3fv;
                    break;
                case gl.FLOAT_MAT4:
                    one.fun = isArray ? this._uniformMatrix4fv : this._uniformMatrix4f;
                    break;
                case gl.SAMPLER_2D:
                case gl.SAMPLER_2D_SHADOW:
                    gl.uniform1i(one.location, this._curActTexIndex);
                    one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                    one.fun = this._uniform_sampler2D;
                    break;
                case gl.SAMPLER_2D_ARRAY:
                    gl.uniform1i(one.location, this._curActTexIndex);
                    one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                    one.fun = this._uniform_sampler2DArray;
                    break;
                case 0x8b5f:
                    gl.uniform1i(one.location, this._curActTexIndex);
                    one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                    one.fun = this._uniform_sampler3D;
                    break;
                case gl.SAMPLER_CUBE:
                    gl.uniform1i(one.location, this._curActTexIndex);
                    one.textureID = this._engine._glTextureIDParams[this._curActTexIndex++];
                    one.fun = this._uniform_samplerCube;
                    break;
                case gl.UNIFORM_BUFFER:
                    one.fun = this._uniform_UniformBuffer;
                    break;
                default:
                    throw new Error("compile shader err!");
            }
        }
        getUniformMap() {
            return this._uniformMap;
        }
        bind() {
            return this.useProgram();
        }
        useProgram() {
            if (this._engine._glUseProgram === this)
                return false;
            this._gl.useProgram(this._program);
            this._engine._glUseProgram = this;
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_SetRenderPassCount, 1);
            return true;
        }
        _uniform1f(one, value) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== value) {
                this._gl.uniform1f(one.location, uploadedValue[0] = value);
                return 1;
            }
            return 0;
        }
        _uniform1fv(one, value) {
            if (value.length < 4) {
                var uploadedValue = one.uploadedValue;
                if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
                    this._gl.uniform1fv(one.location, value);
                    uploadedValue[0] = value[0];
                    uploadedValue[1] = value[1];
                    uploadedValue[2] = value[2];
                    uploadedValue[3] = value[3];
                    return 1;
                }
                return 0;
            }
            else {
                this._gl.uniform1fv(one.location, value);
                return 1;
            }
        }
        _uniform_vec2(one, v) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== v.x || uploadedValue[1] !== v.y) {
                this._gl.uniform2f(one.location, uploadedValue[0] = v.x, uploadedValue[1] = v.y);
                return 1;
            }
            return 0;
        }
        _uniform_vec2v(one, value) {
            if (value.length < 2) {
                var uploadedValue = one.uploadedValue;
                if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
                    this._gl.uniform2fv(one.location, value);
                    uploadedValue[0] = value[0];
                    uploadedValue[1] = value[1];
                    uploadedValue[2] = value[2];
                    uploadedValue[3] = value[3];
                    return 1;
                }
                return 0;
            }
            else {
                this._gl.uniform2fv(one.location, value);
                return 1;
            }
        }
        _uniform_vec3(one, v) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== v.x || uploadedValue[1] !== v.y || uploadedValue[2] !== v.z) {
                this._gl.uniform3f(one.location, uploadedValue[0] = v.x, uploadedValue[1] = v.y, uploadedValue[2] = v.z);
                return 1;
            }
            return 0;
        }
        _uniform_vec3v(one, v) {
            this._gl.uniform3fv(one.location, v);
            return 1;
        }
        _uniform_vec4(one, v) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== v.x || uploadedValue[1] !== v.y || uploadedValue[2] !== v.z || uploadedValue[3] !== v.w) {
                this._gl.uniform4f(one.location, uploadedValue[0] = v.x, uploadedValue[1] = v.y, uploadedValue[2] = v.z, uploadedValue[3] = v.w);
                return 1;
            }
            return 0;
        }
        _uniform_vec4v(one, v) {
            this._gl.uniform4fv(one.location, v);
            return 1;
        }
        _uniformMatrix2fv(one, value) {
            this._gl.uniformMatrix2fv(one.location, false, value);
            return 1;
        }
        _uniformMatrix3fv(one, m) {
            let value = m.elements;
            this._gl.uniformMatrix3fv(one.location, false, value);
            return 1;
        }
        _uniformMatrix4f(one, m) {
            var value = m.elements;
            this._gl.uniformMatrix4fv(one.location, false, value);
            return 1;
        }
        _uniformMatrix4fv(one, m) {
            this._gl.uniformMatrix4fv(one.location, false, m);
            return 1;
        }
        _uniform1i(one, value) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== value) {
                this._gl.uniform1i(one.location, uploadedValue[0] = value);
                return 1;
            }
            return 0;
        }
        _uniform1iv(one, value) {
            this._gl.uniform1iv(one.location, value);
            return 1;
        }
        _uniform_ivec2(one, value) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1]) {
                this._gl.uniform2i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1]);
                return 1;
            }
            return 0;
        }
        _uniform_ivec2v(one, value) {
            this._gl.uniform2iv(one.location, value);
            return 1;
        }
        _uniform_vec3i(one, value) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2]) {
                this._gl.uniform3i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2]);
                return 1;
            }
            return 0;
        }
        _uniform_vec3vi(one, value) {
            this._gl.uniform3iv(one.location, value);
            return 1;
        }
        _uniform_vec4i(one, value) {
            var uploadedValue = one.uploadedValue;
            if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
                this._gl.uniform4i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2], uploadedValue[3] = value[3]);
                return 1;
            }
            return 0;
        }
        _uniform_vec4vi(one, value) {
            this._gl.uniform4iv(one.location, value);
            return 1;
        }
        _uniform_sampler2D(one, texture) {
            var value = texture ? texture._getSource() : Laya.Texture2D.errorTexture._getSource();
            var gl = this._gl;
            this._bindTexture(one.textureID, gl.TEXTURE_2D, value);
            return 0;
        }
        _uniform_sampler2DArray(one, texture) {
            var value = texture ? texture._getSource() : Laya.Texture2D.errorTexture._getSource();
            var gl = this._gl;
            this._bindTexture(one.textureID, gl.TEXTURE_2D_ARRAY, value);
            return 0;
        }
        _uniform_sampler3D(one, texture) {
            var value = texture ? texture._getSource() : Laya.Texture2D.errorTexture._getSource();
            var gl = this._gl;
            this._bindTexture(one.textureID, gl.TEXTURE_3D, value);
            return 0;
        }
        _uniform_samplerCube(one, texture) {
            var value = texture ? texture._getSource() : Laya.TextureCube.errorTexture._getSource();
            var gl = this._gl;
            this._bindTexture(one.textureID, gl.TEXTURE_CUBE_MAP, value);
            return 0;
        }
        _uniform_UniformBuffer(one, value) {
            value._bindUniformBufferBase();
            return 1;
        }
        _bindTexture(textureID, target, texture) {
            const gl = this._gl;
            if (this._engine._activedTextureID !== textureID) {
                gl.activeTexture(textureID);
                this._engine._activedTextureID = textureID;
            }
            const texID = this._engine._activedTextureID - this._gl.TEXTURE0;
            if (this._engine._activeTextures[texID] !== texture) {
                gl.bindTexture(target, texture);
                this._engine._activeTextures[texID] = texture;
            }
        }
        destroy() {
            super.destroy();
            const gl = this._gl;
            gl.deleteShader(this._vshader);
            gl.deleteShader(this._pshader);
            gl.deleteProgram(this._program);
            this._vshader = null;
            this._pshader = null;
            this._program = null;
            this._attributeMap = null;
            this._uniformMap = null;
            this._uniformObjectMap = null;
            this._gl = null;
            this._engine = null;
        }
    }

    class GLVertexState extends GLObject {
        constructor(engine) {
            super(engine);
            this._vertexDeclaration = [];
            if (!engine.isWebGL2)
                this._vaoExt = engine._supportCapatable.getExtension(exports.WebGLExtension.OES_vertex_array_object);
            this._vao = this.createVertexArray();
            this._angleInstancedArrays = this._engine._supportCapatable.getExtension(exports.WebGLExtension.ANGLE_instanced_arrays);
        }
        createVertexArray() {
            if (this._engine.isWebGL2)
                return this._gl.createVertexArray();
            else
                return this._vaoExt.createVertexArrayOES();
        }
        deleteVertexArray() {
            if (this._engine.isWebGL2)
                this._gl.deleteVertexArray(this._vao);
            else
                this._vaoExt.deleteVertexArrayOES(this._vao);
        }
        bindVertexArray() {
            if (this._engine._GLBindVertexArray == this)
                return;
            if (this._engine.isWebGL2)
                this._gl.bindVertexArray(this._vao);
            else
                this._vaoExt.bindVertexArrayOES(this._vao);
            this._engine._GLBindVertexArray = this;
        }
        unbindVertexArray() {
            if (this._engine.isWebGL2)
                this._gl.bindVertexArray(null);
            else
                this._vaoExt.bindVertexArrayOES(null);
            this._engine._GLBindVertexArray = null;
        }
        isVertexArray() {
            if (this._engine.isWebGL2)
                this._gl.isVertexArray(this._vao);
            else
                this._vaoExt.isVertexArrayOES(this._vao);
        }
        applyVertexBuffer(vertexBuffer) {
            this.clearVAO();
            this._vertexBuffers = vertexBuffer;
            if (this._engine._GLBindVertexArray == this) {
                this._vertexDeclaration.length = vertexBuffer.length;
                var i = 0;
                vertexBuffer.forEach(element => {
                    var verDec = element._shaderValues;
                    this._vertexDeclaration[i++] = element._shaderValues;
                    element.bind();
                    for (var k in verDec) {
                        var loc = parseInt(k);
                        var attribute = verDec[k];
                        this._gl.enableVertexAttribArray(loc);
                        this._gl.vertexAttribPointer(loc, attribute.elementCount, attribute.elementType, !!attribute.normalized, attribute.vertexStride, attribute.elementOffset);
                        if (element.instanceBuffer)
                            this.vertexAttribDivisor(loc, 1);
                    }
                });
            }
            else {
                throw "BufferState: must call bind() function first.";
            }
        }
        clearVAO() {
            for (let i = 0, n = this._vertexDeclaration.length; i < n; i++) {
                var verDec = this._vertexDeclaration[i];
                for (var k in verDec) {
                    var loc = parseInt(k);
                    this._gl.disableVertexAttribArray(loc);
                }
            }
        }
        applyIndexBuffer(indexBuffer) {
            if (indexBuffer == null) {
                return;
            }
            if (this._engine._GLBindVertexArray == this) {
                if (this._bindedIndexBuffer !== indexBuffer) {
                    indexBuffer._glBuffer.bindBuffer();
                    this._bindedIndexBuffer = indexBuffer;
                }
            }
            else {
                throw "BufferState: must call bind() function first.";
            }
        }
        vertexAttribDivisor(index, divisor) {
            if (this._engine.isWebGL2)
                this._gl.vertexAttribDivisor(index, divisor);
            else
                this._angleInstancedArrays.vertexAttribDivisorANGLE(index, divisor);
        }
        destroy() {
            super.destroy();
            this._gl;
            this.deleteVertexArray();
            this._gl = null;
            this._engine = null;
        }
    }

    class VertexArrayObject {
        constructor() {
        }
    }
    (function () {
        var glErrorShadow = {};
        function error(msg) {
            if (window.console && window.console.error) {
                window.console.error(msg);
            }
        }
        function log(msg) {
            if (window.console && window.console.log) {
                window.console.log(msg);
            }
        }
        function synthesizeGLError(err, opt_msg) {
            glErrorShadow[err] = true;
            if (opt_msg !== undefined) {
                error(opt_msg);
            }
        }
        function wrapGLError(gl) {
            var f = gl.getError;
            gl.getError = function () {
                var err;
                do {
                    err = f.apply(gl);
                    if (err != gl.NO_ERROR) {
                        glErrorShadow[err] = true;
                    }
                } while (err != gl.NO_ERROR);
                for (var err1 in glErrorShadow) {
                    if (glErrorShadow[err1]) {
                        delete glErrorShadow[err1];
                        return parseInt(err1);
                    }
                }
                return gl.NO_ERROR;
            };
        }
        var WebGLVertexArrayObjectOES = function WebGLVertexArrayObjectOES(ext) {
            var gl = ext.gl;
            this.ext = ext;
            this.isAlive = true;
            this.hasBeenBound = false;
            this.elementArrayBuffer = null;
            this.attribs = new Array(ext.maxVertexAttribs);
            for (var n = 0; n < this.attribs.length; n++) {
                var attrib = new WebGLVertexArrayObjectOES.VertexAttrib(gl);
                this.attribs[n] = attrib;
            }
            this.maxAttrib = 0;
        };
        WebGLVertexArrayObjectOES.VertexAttrib = function VertexAttrib(gl) {
            this.enabled = false;
            this.buffer = null;
            this.size = 4;
            this.type = gl.FLOAT;
            this.normalized = false;
            this.stride = 16;
            this.offset = 0;
            this.cached = "";
            this.recache();
        };
        WebGLVertexArrayObjectOES.VertexAttrib.prototype.recache = function recache() {
            this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":");
        };
        var OESVertexArrayObject = function OESVertexArrayObject(gl) {
            var self = this;
            this.gl = gl;
            wrapGLError(gl);
            var original = this.original = {
                getParameter: gl.getParameter,
                enableVertexAttribArray: gl.enableVertexAttribArray,
                disableVertexAttribArray: gl.disableVertexAttribArray,
                bindBuffer: gl.bindBuffer,
                getVertexAttrib: gl.getVertexAttrib,
                vertexAttribPointer: gl.vertexAttribPointer
            };
            gl.getParameter = function getParameter(pname) {
                if (pname == self.VERTEX_ARRAY_BINDING_OES) {
                    if (self.currentVertexArrayObject == self.defaultVertexArrayObject) {
                        return null;
                    }
                    else {
                        return self.currentVertexArrayObject;
                    }
                }
                return original.getParameter.apply(this, arguments);
            };
            gl.enableVertexAttribArray = function enableVertexAttribArray(index) {
                var vao = self.currentVertexArrayObject;
                vao.maxAttrib = Math.max(vao.maxAttrib, index);
                var attrib = vao.attribs[index];
                attrib.enabled = true;
                return original.enableVertexAttribArray.apply(this, arguments);
            };
            gl.disableVertexAttribArray = function disableVertexAttribArray(index) {
                var vao = self.currentVertexArrayObject;
                vao.maxAttrib = Math.max(vao.maxAttrib, index);
                var attrib = vao.attribs[index];
                attrib.enabled = false;
                return original.disableVertexAttribArray.apply(this, arguments);
            };
            gl.bindBuffer = function bindBuffer(target, buffer) {
                switch (target) {
                    case gl.ARRAY_BUFFER:
                        self.currentArrayBuffer = buffer;
                        break;
                    case gl.ELEMENT_ARRAY_BUFFER:
                        self.currentVertexArrayObject.elementArrayBuffer = buffer;
                        break;
                }
                return original.bindBuffer.apply(this, arguments);
            };
            gl.getVertexAttrib = function getVertexAttrib(index, pname) {
                var vao = self.currentVertexArrayObject;
                var attrib = vao.attribs[index];
                switch (pname) {
                    case gl.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
                        return attrib.buffer;
                    case gl.VERTEX_ATTRIB_ARRAY_ENABLED:
                        return attrib.enabled;
                    case gl.VERTEX_ATTRIB_ARRAY_SIZE:
                        return attrib.size;
                    case gl.VERTEX_ATTRIB_ARRAY_STRIDE:
                        return attrib.stride;
                    case gl.VERTEX_ATTRIB_ARRAY_TYPE:
                        return attrib.type;
                    case gl.VERTEX_ATTRIB_ARRAY_NORMALIZED:
                        return attrib.normalized;
                    default:
                        return original.getVertexAttrib.apply(this, arguments);
                }
            };
            gl.vertexAttribPointer = function vertexAttribPointer(indx, size, type, normalized, stride, offset) {
                var vao = self.currentVertexArrayObject;
                vao.maxAttrib = Math.max(vao.maxAttrib, indx);
                var attrib = vao.attribs[indx];
                attrib.buffer = self.currentArrayBuffer;
                attrib.size = size;
                attrib.type = type;
                attrib.normalized = normalized;
                attrib.stride = stride;
                attrib.offset = offset;
                attrib.recache();
                return original.vertexAttribPointer.apply(this, arguments);
            };
            if (gl.instrumentExtension) {
                gl.instrumentExtension(this, "OES_vertex_array_object");
            }
            gl.canvas.addEventListener('webglcontextrestored', function () {
                log("OESVertexArrayObject emulation library context restored");
                self.reset_();
            }, true);
            this.reset_();
        };
        OESVertexArrayObject.prototype.VERTEX_ARRAY_BINDING_OES = 0x85B5;
        OESVertexArrayObject.prototype.reset_ = function reset_() {
            var contextWasLost = this.vertexArrayObjects !== undefined;
            if (contextWasLost) {
                for (var ii = 0; ii < this.vertexArrayObjects.length; ++ii) {
                    this.vertexArrayObjects.isAlive = false;
                }
            }
            var gl = this.gl;
            this.maxVertexAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
            this.defaultVertexArrayObject = new WebGLVertexArrayObjectOES(this);
            this.currentVertexArrayObject = null;
            this.currentArrayBuffer = null;
            this.vertexArrayObjects = [this.defaultVertexArrayObject];
            this.bindVertexArrayOES(null);
        };
        OESVertexArrayObject.prototype.createVertexArrayOES = function createVertexArrayOES() {
            var arrayObject = new WebGLVertexArrayObjectOES(this);
            this.vertexArrayObjects.push(arrayObject);
            return arrayObject;
        };
        OESVertexArrayObject.prototype.deleteVertexArrayOES = function deleteVertexArrayOES(arrayObject) {
            arrayObject.isAlive = false;
            this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(arrayObject), 1);
            if (this.currentVertexArrayObject == arrayObject) {
                this.bindVertexArrayOES(null);
            }
        };
        OESVertexArrayObject.prototype.isVertexArrayOES = function isVertexArrayOES(arrayObject) {
            if (arrayObject && arrayObject instanceof WebGLVertexArrayObjectOES) {
                if (arrayObject.hasBeenBound && arrayObject.ext == this) {
                    return true;
                }
            }
            return false;
        };
        OESVertexArrayObject.prototype.bindVertexArrayOES = function bindVertexArrayOES(arrayObject) {
            var gl = this.gl;
            if (arrayObject && !arrayObject.isAlive) {
                synthesizeGLError(gl.INVALID_OPERATION, "bindVertexArrayOES: attempt to bind deleted arrayObject");
                return;
            }
            var original = this.original;
            var oldVAO = this.currentVertexArrayObject;
            this.currentVertexArrayObject = arrayObject || this.defaultVertexArrayObject;
            this.currentVertexArrayObject.hasBeenBound = true;
            var newVAO = this.currentVertexArrayObject;
            if (oldVAO == newVAO) {
                return;
            }
            if (!oldVAO || newVAO.elementArrayBuffer != oldVAO.elementArrayBuffer) {
                original.bindBuffer.call(gl, gl.ELEMENT_ARRAY_BUFFER, newVAO.elementArrayBuffer);
            }
            var currentBinding = this.currentArrayBuffer;
            var maxAttrib = Math.max(oldVAO ? oldVAO.maxAttrib : 0, newVAO.maxAttrib);
            for (var n = 0; n <= maxAttrib; n++) {
                var attrib = newVAO.attribs[n];
                var oldAttrib = oldVAO ? oldVAO.attribs[n] : null;
                if (!oldVAO || attrib.enabled != oldAttrib.enabled) {
                    if (attrib.enabled) {
                        original.enableVertexAttribArray.call(gl, n);
                    }
                    else {
                        original.disableVertexAttribArray.call(gl, n);
                    }
                }
                if (attrib.enabled) {
                    var bufferChanged = false;
                    if (!oldVAO || attrib.buffer != oldAttrib.buffer) {
                        if (currentBinding != attrib.buffer) {
                            original.bindBuffer.call(gl, gl.ARRAY_BUFFER, attrib.buffer);
                            currentBinding = attrib.buffer;
                        }
                        bufferChanged = true;
                    }
                    if (bufferChanged || attrib.cached != oldAttrib.cached) {
                        original.vertexAttribPointer.call(gl, n, attrib.size, attrib.type, attrib.normalized, attrib.stride, attrib.offset);
                    }
                }
            }
            if (this.currentArrayBuffer != currentBinding) {
                original.bindBuffer.call(gl, gl.ARRAY_BUFFER, this.currentArrayBuffer);
            }
        };
        window._setupVertexArrayObject = function (gl) {
            var original_getSupportedExtensions = gl.getSupportedExtensions;
            gl.getSupportedExtensions = function getSupportedExtensions() {
                var list = original_getSupportedExtensions.call(this) || [];
                if (list.indexOf("OES_vertex_array_object") < 0) {
                    list.push("OES_vertex_array_object");
                }
                return list;
            };
            var original_getExtension = gl.getExtension;
            gl.getExtension = function getExtension(name) {
                var ext = original_getExtension.call(this, name);
                if (ext) {
                    return ext;
                }
                if (name !== "OES_vertex_array_object") {
                    return null;
                }
                if (!this.__OESVertexArrayObject) {
                    console.log("Setup OES_vertex_array_object polyfill");
                    this.__OESVertexArrayObject = new OESVertexArrayObject(this);
                }
                return this.__OESVertexArrayObject;
            };
        };
    }());

    class GlCapable {
        constructor(glEngine) {
            this._extentionVendorPrefixes = ["", "WEBKIT_", "MOZ_"];
            this._gl = glEngine.gl;
            this.initExtension(glEngine.isWebGL2);
            this.initCapable(glEngine.isWebGL2);
        }
        initCapable(isWebgl2) {
            this._capabilityMap = new Map();
            let value = isWebgl2 || !!(this.getExtension(exports.WebGLExtension.OES_element_index_uint));
            this._capabilityMap.set(Laya.RenderCapable.Element_Index_Uint32, value);
            value = isWebgl2 || !!(this.getExtension(exports.WebGLExtension.OES_texture_float));
            this._capabilityMap.set(Laya.RenderCapable.TextureFormat_R32G32B32A32, value);
            value = isWebgl2 || !!(this.getExtension(exports.WebGLExtension.OES_texture_half_float));
            this._capabilityMap.set(Laya.RenderCapable.TextureFormat_R16G16B16A16, value);
            value = !!(this.getExtension(exports.WebGLExtension.EXT_texture_filter_anisotropic));
            this._capabilityMap.set(Laya.RenderCapable.Texture_anisotropic, value);
            if (isWebgl2) {
                value = !!this.getExtension(exports.WebGLExtension.EXT_color_buffer_float) || !!this.getExtension(exports.WebGLExtension.EXT_color_buffer_half_float);
            }
            else {
                value = ((!!this.getExtension(exports.WebGLExtension.OES_texture_half_float)) || (!!this.getExtension(exports.WebGLExtension.EXT_color_buffer_half_float))) && (!!this.getExtension(exports.WebGLExtension.OES_texture_half_float_linear));
            }
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_R16G16B16A16, value);
            if (isWebgl2) {
                value = !!this.getExtension(exports.WebGLExtension.EXT_color_buffer_float) && !!this.getExtension(exports.WebGLExtension.OES_texture_float_linear);
            }
            else {
                value = (!!this.getExtension(exports.WebGLExtension.OES_texture_float)) && (!!this.getExtension(exports.WebGLExtension.OES_texture_float_linear));
            }
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_R32G32B32A32, value);
            value = isWebgl2 || (!!this.getExtension(exports.WebGLExtension.WEBGL_depth_texture));
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_Depth, value);
            value = isWebgl2;
            this._capabilityMap.set(Laya.RenderCapable.RenderTextureFormat_ShadowMap, value);
            value = isWebgl2 || (!!this.getExtension(exports.WebGLExtension.OES_vertex_array_object));
            this._capabilityMap.set(Laya.RenderCapable.Vertex_VAO, value);
            value = (isWebgl2 || (!!this.getExtension(exports.WebGLExtension.ANGLE_instanced_arrays)));
            this._capabilityMap.set(Laya.RenderCapable.DrawElement_Instance, value);
            value = (isWebgl2) || (!!this.getExtension(exports.WebGLExtension.EXT_shader_texture_lod));
            this._capabilityMap.set(Laya.RenderCapable.Shader_TextureLod, value);
            value = (!!this.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_s3tc));
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC, value);
            value = (!!this.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_s3tc_srgb));
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_S3TC_SRGB, value);
            value = (!!this.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_pvrtc));
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_PVRTC, value);
            value = (!!this.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_etc1));
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ETC1, value);
            value = (!!this.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_etc));
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ETC, value);
            value = (!!this.getExtension(exports.WebGLExtension.WEBGL_compressed_texture_astc));
            this._capabilityMap.set(Laya.RenderCapable.COMPRESS_TEXTURE_ASTC, value);
            value = (isWebgl2) || (!!this.getExtension(exports.WebGLExtension.EXT_sRGB));
            this._capabilityMap.set(Laya.RenderCapable.Texture_SRGB, value);
            value = (!!this.getExtension(exports.WebGLExtension.OES_texture_float_linear));
            this._capabilityMap.set(Laya.RenderCapable.Texture_FloatLinearFiltering, value);
            value = isWebgl2 || (!!this.getExtension(exports.WebGLExtension.OES_texture_half_float_linear));
            this._capabilityMap.set(Laya.RenderCapable.Texture_HalfFloatLinearFiltering, value);
            value = isWebgl2;
            this._capabilityMap.set(Laya.RenderCapable.MSAA, value);
            this._capabilityMap.set(Laya.RenderCapable.UnifromBufferObject, value);
            this._capabilityMap.set(Laya.RenderCapable.Texture3D, value);
        }
        initExtension(isWebgl2) {
            this._extensionMap = new Map();
            const setExtensionMap = (extension, value, map) => {
                value && map.set(extension, value);
            };
            const _extTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic");
            setExtensionMap(exports.WebGLExtension.EXT_texture_filter_anisotropic, _extTextureFilterAnisotropic, this._extensionMap);
            const _compressedTextureS3tc = this._getExtension("WEBGL_compressed_texture_s3tc");
            setExtensionMap(exports.WebGLExtension.WEBGL_compressed_texture_s3tc, _compressedTextureS3tc, this._extensionMap);
            const _compressdTextureS3tc_srgb = this._getExtension("WEBGL_compressed_texture_s3tc_srgb");
            setExtensionMap(exports.WebGLExtension.WEBGL_compressed_texture_s3tc_srgb, _compressdTextureS3tc_srgb, this._extensionMap);
            const _compressedTexturePvrtc = this._getExtension("WEBGL_compressed_texture_pvrtc");
            setExtensionMap(exports.WebGLExtension.WEBGL_compressed_texture_pvrtc, _compressedTexturePvrtc, this._extensionMap);
            const _compressedTextureEtc1 = this._getExtension("WEBGL_compressed_texture_etc1");
            setExtensionMap(exports.WebGLExtension.WEBGL_compressed_texture_etc1, _compressedTextureEtc1, this._extensionMap);
            const _compressedTextureETC = this._getExtension("WEBGL_compressed_texture_etc");
            setExtensionMap(exports.WebGLExtension.WEBGL_compressed_texture_etc, _compressedTextureETC, this._extensionMap);
            const _compressedTextureASTC = this._getExtension("WEBGL_compressed_texture_astc");
            setExtensionMap(exports.WebGLExtension.WEBGL_compressed_texture_astc, _compressedTextureASTC, this._extensionMap);
            const _oesTextureFloatLinear = this._getExtension("OES_texture_float_linear");
            setExtensionMap(exports.WebGLExtension.OES_texture_float_linear, _oesTextureFloatLinear, this._extensionMap);
            const _extColorBufferHalfFloat = this._getExtension("EXT_color_buffer_half_float");
            setExtensionMap(exports.WebGLExtension.EXT_color_buffer_half_float, _extColorBufferHalfFloat, this._extensionMap);
            if (isWebgl2) {
                const _extColorBufferFloat = this._getExtension("EXT_color_buffer_float");
                setExtensionMap(exports.WebGLExtension.EXT_color_buffer_float, _extColorBufferFloat, this._extensionMap);
            }
            else {
                if (window._setupVertexArrayObject)
                    window._setupVertexArrayObject(this._gl);
                const _vaoExt = this._getExtension("OES_vertex_array_object");
                setExtensionMap(exports.WebGLExtension.OES_vertex_array_object, _vaoExt, this._extensionMap);
                const _angleInstancedArrays = this._getExtension("ANGLE_instanced_arrays");
                setExtensionMap(exports.WebGLExtension.ANGLE_instanced_arrays, _angleInstancedArrays, this._extensionMap);
                const _oesTextureHalfFloat = this._getExtension("OES_texture_half_float");
                setExtensionMap(exports.WebGLExtension.OES_texture_half_float, _oesTextureHalfFloat, this._extensionMap);
                const _oesTextureHalfFloatLinear = this._getExtension("OES_texture_half_float_linear");
                setExtensionMap(exports.WebGLExtension.OES_texture_half_float_linear, _oesTextureHalfFloatLinear, this._extensionMap);
                const _oesTextureFloat = this._getExtension("OES_texture_float");
                setExtensionMap(exports.WebGLExtension.OES_texture_float, _oesTextureFloat, this._extensionMap);
                const _oes_element_index_uint = this._getExtension("OES_element_index_uint");
                setExtensionMap(exports.WebGLExtension.OES_element_index_uint, _oes_element_index_uint, this._extensionMap);
                const _extShaderTextureLod = this._getExtension("EXT_shader_texture_lod");
                setExtensionMap(exports.WebGLExtension.EXT_shader_texture_lod, _extShaderTextureLod, this._extensionMap);
                const _webgl_depth_texture = this._getExtension("WEBGL_depth_texture");
                setExtensionMap(exports.WebGLExtension.WEBGL_depth_texture, _webgl_depth_texture, this._extensionMap);
                const _sRGB = this._getExtension("EXT_sRGB");
                setExtensionMap(exports.WebGLExtension.EXT_sRGB, _sRGB, this._extensionMap);
                const OES_standard_derivatives = this._getExtension("OES_standard_derivatives");
                setExtensionMap(exports.WebGLExtension.OES_standard_derivatives, OES_standard_derivatives, this._extensionMap);
            }
        }
        getCapable(type) {
            return this._capabilityMap.get(type);
        }
        getExtension(type) {
            if (this._extensionMap.has(type))
                return this._extensionMap.get(type);
            else
                return null;
        }
        _getExtension(name) {
            const prefixes = this._extentionVendorPrefixes;
            for (const k in prefixes) {
                var ext = this._gl.getExtension(prefixes[k] + name);
                if (ext)
                    return ext;
            }
            return null;
        }
    }

    class WebGLEngine extends Laya.EventDispatcher {
        get lost() {
            return this._lost;
        }
        constructor(config, webglMode = exports.WebGLMode.Auto) {
            super();
            this._lost = false;
            this._propertyNameMap = {};
            this._propertyNameCounter = 0;
            this._IDCounter = 0;
            this._isShaderDebugMode = true;
            this._enableStatistics = false;
            this._curUBOPointer = 0;
            this._GLUBOPointerMap = new Map();
            this._GLBindPointerUBOMap = new Map();
            this._lastClearColor = new Laya.Color;
            this._lastClearDepth = -1;
            this._remapZ = true;
            this._screenInvertY = false;
            this._lodTextureSample = true;
            this._breakTextureSample = true;
            this._GLStatisticsInfo = new Map();
            this._config = config;
            this._isWebGL2 = false;
            this._lastViewport = new Laya.Vector4(0, 0, 0, 0);
            this._lastClearColor = new Laya.Color(0, 0, 0, 0);
            this._lastScissor = new Laya.Vector4(0, 0, 0, 0);
            this._webglMode = webglMode;
            this._initStatisticsInfo();
            WebGLEngine.instance = this;
        }
        endFrame() {
            this.event("endFrame", null);
        }
        getInnerWidth() {
            if (Laya.LayaEnv.isConch) {
                return window.getInnerWidth();
            }
            else
                return this._globalWidth;
        }
        getInnerHeight() {
            if (Laya.LayaEnv.isConch) {
                return window.getInnerHeight();
            }
            else
                return this._globalHeight;
        }
        resizeOffScreen(width, height) {
            this._globalWidth = width;
            this._globalHeight = height;
            if (Laya.LayaEnv.isConch) {
                if (WebGLEngine._lastFrameBuffer) {
                    WebGLEngine._lastFrameBuffer.dispose();
                    WebGLEngine._lastFrameBuffer_WebGLOBJ = null;
                }
                WebGLEngine._lastFrameBuffer = this.getTextureContext().createRenderTargetInternal(width, height, Laya.RenderTargetFormat.R8G8B8A8, Laya.RenderTargetFormat.None, false, false, 1);
                WebGLEngine._lastFrameBuffer_WebGLOBJ = WebGLEngine._lastFrameBuffer._framebuffer;
            }
        }
        addTexGammaDefine(key, value) {
            WebGLEngine._texGammaDefine[key] = value;
        }
        get gl() {
            return this._context;
        }
        get isWebGL2() {
            return this._isWebGL2;
        }
        get webglConfig() {
            return this._config;
        }
        _initStatisticsInfo() {
            for (var i = 0; i < Laya.GPUEngineStatisticsInfo.Count; i++) {
                this._GLStatisticsInfo.set(i, 0);
            }
        }
        _addStatisticsInfo(info, value) {
            this._enableStatistics && this._GLStatisticsInfo.set(info, this._GLStatisticsInfo.get(info) + value);
        }
        clearStatisticsInfo() {
            if (this._enableStatistics) {
                for (var i = 0; i < Laya.GPUEngineStatisticsInfo.FrameClearCount; i++) {
                    this._GLStatisticsInfo.set(i, 0);
                }
            }
        }
        getStatisticsInfo(info) {
            return this._GLStatisticsInfo.get(info);
        }
        _getBindUBOBuffer(glPointer) {
            return this._GLBindPointerUBOMap.get(glPointer);
        }
        _setBindUBOBuffer(glPointer, buffer) {
            this._GLBindPointerUBOMap.set(glPointer, buffer);
        }
        initRenderEngine(canvas) {
            let names;
            let gl;
            switch (this._webglMode) {
                case exports.WebGLMode.Auto:
                    names = ["webgl2", "experimental-webgl2", "webgl", "experimental-webgl"];
                    break;
                case exports.WebGLMode.WebGL1:
                    names = ["webgl", "experimental-webgl"];
                    break;
                case exports.WebGLMode.WebGL2:
                    names = ["webgl2", "experimental-webgl2"];
                    break;
            }
            for (var i = 0; i < names.length; i++) {
                try {
                    gl = canvas.getContext(names[i], this._config);
                }
                catch (e) {
                }
                if (gl) {
                    if (names[i] === 'webgl2' || names[i] === 'experimental-webgl2') {
                        this._isWebGL2 = true;
                    }
                    break;
                }
            }
            this._context = gl;
            this.scissorTest(true);
            this._initBindBufferMap();
            this._supportCapatable = new GlCapable(this);
            this._GLParams = new GLParams(this);
            this._GLRenderState = new GLRenderState(this);
            this._glTextureIDParams = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2, gl.TEXTURE3, gl.TEXTURE4, gl.TEXTURE5, gl.TEXTURE6, gl.TEXTURE7, gl.TEXTURE8, gl.TEXTURE9, gl.TEXTURE10, gl.TEXTURE11, gl.TEXTURE12, gl.TEXTURE13, gl.TEXTURE14, gl.TEXTURE15, gl.TEXTURE16, gl.TEXTURE17, gl.TEXTURE18, gl.TEXTURE19, gl.TEXTURE20, gl.TEXTURE21, gl.TEXTURE22, gl.TEXTURE23, gl.TEXTURE24, gl.TEXTURE25, gl.TEXTURE26, gl.TEXTURE27, gl.TEXTURE28, gl.TEXTURE29, gl.TEXTURE30, gl.TEXTURE31];
            this._activedTextureID = gl.TEXTURE0;
            this._activeTextures = [];
            this._GLTextureContext = this.isWebGL2 ? new GL2TextureContext(this) : new GLTextureContext(this);
            this._GLRenderDrawContext = new GLRenderDrawContext(this);
            canvas.addEventListener("webglcontextlost", this.webglContextLost);
        }
        webglContextLost(e) {
            console.log("lost webgl context");
            Laya.Laya.stage.event("GraphicContextLost", e);
            this._lost = true;
        }
        _initBindBufferMap() {
            this._GLBufferBindMap = {};
            this._GLBufferBindMap[Laya.BufferTargetType.ARRAY_BUFFER] = null;
            this._GLBufferBindMap[Laya.BufferTargetType.ELEMENT_ARRAY_BUFFER] = null;
            this._GLBufferBindMap[Laya.BufferTargetType.UNIFORM_BUFFER] = null;
        }
        _getbindBuffer(target) {
            return this._GLBufferBindMap[target];
        }
        _setbindBuffer(target, buffer) {
            this._GLBufferBindMap[target] = buffer;
        }
        _bindTexture(target, texture) {
            const texID = this._activedTextureID - this._context.TEXTURE0;
            if (this._activeTextures[texID] !== texture) {
                this._context.bindTexture(target, texture);
                this._activeTextures[texID] = texture;
            }
        }
        getCapable(capatableType) {
            return this._supportCapatable.getCapable(capatableType);
        }
        viewport(x, y, width, height) {
            const gl = this._context;
            const lv = this._lastViewport;
            if (Laya.LayaEnv.isConch) {
                gl.viewport(x, y, width, height);
            }
            else if (x !== lv.x || y !== lv.y || width !== lv.z || height !== lv.w) {
                gl.viewport(x, y, width, height);
                lv.setValue(x, y, width, height);
            }
        }
        scissor(x, y, width, height) {
            const gl = this._context;
            const lv = this._lastScissor;
            if (Laya.LayaEnv.isConch) {
                gl.scissor(x, y, width, height);
            }
            else if (x !== lv.x || y !== lv.y || width !== lv.z || height !== lv.w) {
                gl.scissor(x, y, width, height);
                lv.setValue(x, y, width, height);
            }
        }
        scissorTest(value) {
            if (this._scissorState == value)
                return;
            this._scissorState = value;
            if (value)
                this._context.enable(this._context.SCISSOR_TEST);
            else
                this._context.disable(this._context.SCISSOR_TEST);
        }
        clearRenderTexture(clearFlag, clearcolor = null, clearDepth = 1, clearStencilValue = 0) {
            var flag;
            if (clearFlag & Laya.RenderClearFlag.Color) {
                if (clearcolor && !this._lastClearColor.equal(clearcolor)) {
                    this._context.clearColor(clearcolor.r, clearcolor.g, clearcolor.b, clearcolor.a);
                    clearcolor.cloneTo(this._lastClearColor);
                }
                flag |= this.gl.COLOR_BUFFER_BIT;
            }
            if (clearFlag & Laya.RenderClearFlag.Depth) {
                if (this._lastClearDepth != clearDepth) {
                    this._context.clearDepth(clearDepth);
                    this._lastClearDepth = clearDepth;
                }
                this._GLRenderState.setDepthMask(true);
                flag |= this._context.DEPTH_BUFFER_BIT;
            }
            if (clearFlag & Laya.RenderClearFlag.Stencil) {
                this._context.clearStencil(clearStencilValue);
                this._GLRenderState.setStencilMask(true);
                flag |= this._context.STENCIL_BUFFER_BIT;
            }
            if (flag)
                this._context.clear(flag);
        }
        copySubFrameBuffertoTex(texture, level, xoffset, yoffset, x, y, width, height) {
            this._bindTexture(texture.target, texture.resource);
            this._context.copyTexSubImage2D(texture.target, level, xoffset, yoffset, x, y, width, height);
        }
        colorMask(r, g, b, a) {
            this._context.colorMask(r, g, b, a);
        }
        getParams(params) {
            return this._GLParams.getParams(params);
        }
        createBuffer(targetType, bufferUsageType) {
            return new GLBuffer(this, targetType, bufferUsageType);
        }
        createShaderInstance(vs, ps, attributeMap) {
            return new GLShaderInstance(this, vs, ps, attributeMap);
        }
        createVertexState() {
            return new GLVertexState(this);
        }
        getUBOPointer(name) {
            if (!this._GLUBOPointerMap.has(name))
                this._GLUBOPointerMap.set(name, this._curUBOPointer++);
            return this._GLUBOPointerMap.get(name);
        }
        getTextureContext() {
            return this._GLTextureContext;
        }
        getDrawContext() {
            return this._GLRenderDrawContext;
        }
        getCreateRenderOBJContext() {
            return this._renderOBJCreateContext;
        }
        propertyNameToID(name) {
            if (this._propertyNameMap[name] != null) {
                return this._propertyNameMap[name];
            }
            else {
                var id = this._propertyNameCounter++;
                this._propertyNameMap[name] = id;
                this._propertyNameMap[id] = name;
                return id;
            }
        }
        propertyIDToName(id) {
            return this._propertyNameMap[id];
        }
        getNamesByDefineData(defineData, out) {
            var maskMap = WebGLEngine._maskMap;
            var mask = defineData._mask;
            out.length = 0;
            for (var i = 0, n = defineData._length; i < n; i++) {
                var subMaskMap = maskMap[i];
                var subMask = mask[i];
                for (var j = 0; j < 32; j++) {
                    var d = 1 << j;
                    if (subMask > 0 && d > subMask)
                        break;
                    if (subMask & d)
                        out.push(subMaskMap[d]);
                }
            }
        }
        getDefineByName(name) {
            var define = WebGLEngine._defineMap[name];
            if (!define) {
                var maskMap = WebGLEngine._maskMap;
                var counter = WebGLEngine._defineCounter;
                var index = Math.floor(counter / 32);
                var value = 1 << counter % 32;
                define = new Laya.ShaderDefine(index, value);
                WebGLEngine._defineMap[name] = define;
                if (index == maskMap.length) {
                    maskMap.length++;
                    maskMap[index] = {};
                }
                maskMap[index][value] = name;
                WebGLEngine._defineCounter++;
            }
            return define;
        }
        uploadUniforms(shader, commandEncoder, shaderData, uploadUnTexture) {
            shaderData.applyUBO && shaderData.applyUBOData();
            var data = shaderData._data;
            var shaderUniform = commandEncoder.getArrayData();
            var shaderCall = 0;
            for (var i = 0, n = shaderUniform.length; i < n; i++) {
                var one = shaderUniform[i];
                if (uploadUnTexture || one.textureID !== -1) {
                    var value = data[one.dataOffset];
                    if (value != null)
                        shaderCall += one.fun.call(one.caller, one, value);
                }
            }
            return shaderCall;
        }
        uploadCustomUniforms(shader, custom, index, data) {
            shader.bind();
            var shaderCall = 0;
            var one = custom[index];
            if (one && data != null)
                shaderCall += one.fun.call(one.caller, one, data);
            return shaderCall;
        }
        unbindVertexState() {
            if (this.isWebGL2)
                this._context.bindVertexArray(null);
            else
                this._supportCapatable.getExtension(exports.WebGLExtension.OES_vertex_array_object).bindVertexArrayOES(null);
            this._GLBindVertexArray = null;
        }
    }
    WebGLEngine._texGammaDefine = {};
    WebGLEngine._lastFrameBuffer = null;
    WebGLEngine._lastFrameBuffer_WebGLOBJ = null;
    WebGLEngine._defineMap = {};
    WebGLEngine._defineCounter = 0;
    WebGLEngine._maskMap = [];

    class WebGLShaderData extends Laya.ShaderData {
        get uniformBufferDatas() {
            return this._uniformBufferDatas;
        }
        get uniformBuffersMap() {
            return this._uniformBuffersMap;
        }
        _releaseUBOData() {
            if (!this._uniformBufferDatas) {
                return;
            }
            for (let value of this._uniformBufferDatas.values()) {
                value.ubo._updateDataInfo.destroy();
                value.ubo.destroy();
                value.ubo._updateDataInfo = null;
            }
            this._uniformBufferDatas.clear();
            this._uniformBuffersMap.clear();
        }
        constructor(ownerResource = null) {
            super(ownerResource);
            this.applyUBO = false;
            this._data = null;
            this._defineDatas = new WebDefineDatas();
            this._initData();
            this._uniformBufferDatas = new Map();
            this._uniformBuffersMap = new Map();
        }
        _addCheckUBO(key, ubo, uboData) {
            this._uniformBufferDatas.set(key, { ubo: ubo, uboBuffer: uboData });
            uboData._uniformParamsState.forEach((value, id) => {
                this.uniformBuffersMap.set(id, ubo);
            });
            ubo.setDataByUniformBufferData(uboData);
        }
        _initData() {
            this._data = {};
            this._gammaColorMap = new Map();
        }
        getData() {
            return this._data;
        }
        applyUBOData() {
            this._uniformBufferDatas.forEach((value, key) => {
                value.ubo.setDataByUniformBufferData(value.uboBuffer);
            });
            this.applyUBO = false;
        }
        addDefine(define) {
            this._defineDatas.add(define);
        }
        addDefines(define) {
            this._defineDatas.addDefineDatas(define);
        }
        removeDefine(define) {
            this._defineDatas.remove(define);
        }
        hasDefine(define) {
            return this._defineDatas.has(define);
        }
        clearDefine() {
            this._defineDatas.clear();
        }
        getBool(index) {
            return this._data[index];
        }
        setBool(index, value) {
            this._data[index] = value;
        }
        getInt(index) {
            return this._data[index];
        }
        setInt(index, value) {
            this._data[index] = value;
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getInt(index));
            }
        }
        getNumber(index) {
            return this._data[index];
        }
        setNumber(index, value) {
            this._data[index] = value;
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getNumber(index));
                this.applyUBO = true;
            }
        }
        getVector2(index) {
            return this._data[index];
        }
        setVector2(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getVector2(index));
                this.applyUBO = true;
            }
        }
        getVector3(index) {
            return this._data[index];
        }
        setVector3(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getVector3(index));
                this.applyUBO = true;
            }
        }
        getVector(index) {
            return this._data[index];
        }
        setVector(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else
                this._data[index] = value.clone();
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getVector(index));
                this.applyUBO = true;
            }
        }
        getColor(index) {
            return this._gammaColorMap.get(index);
        }
        setColor(index, value) {
            if (!value)
                return;
            if (this._data[index]) {
                let gammaColor = this._gammaColorMap.get(index);
                value.cloneTo(gammaColor);
                let linearColor = this._data[index];
                linearColor.x = Laya.Color.gammaToLinearSpace(value.r);
                linearColor.y = Laya.Color.gammaToLinearSpace(value.g);
                linearColor.z = Laya.Color.gammaToLinearSpace(value.b);
                linearColor.w = value.a;
            }
            else {
                let linearColor = new Laya.Vector4();
                linearColor.x = Laya.Color.gammaToLinearSpace(value.r);
                linearColor.y = Laya.Color.gammaToLinearSpace(value.g);
                linearColor.z = Laya.Color.gammaToLinearSpace(value.b);
                linearColor.w = value.a;
                this._data[index] = linearColor;
                this._gammaColorMap.set(index, value.clone());
            }
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getLinearColor(index));
                this.applyUBO = true;
            }
        }
        getLinearColor(index) {
            return this._data[index];
        }
        getMatrix4x4(index) {
            return this._data[index];
        }
        setMatrix4x4(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else {
                this._data[index] = value.clone();
            }
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getMatrix4x4(index));
                this.applyUBO = true;
            }
        }
        getMatrix3x3(index) {
            return this._data[index];
        }
        setMatrix3x3(index, value) {
            if (this._data[index]) {
                value.cloneTo(this._data[index]);
            }
            else {
                this._data[index] = value.clone();
            }
            let ubo = this._uniformBuffersMap.get(index);
            if (ubo) {
                this._uniformBufferDatas.get(ubo._name).uboBuffer._setData(index, this.getMatrix3x3(index));
            }
        }
        getBuffer(index) {
            return this._data[index];
        }
        setBuffer(index, value) {
            this._data[index] = value;
        }
        setTexture(index, value) {
            var lastValue = this._data[index];
            if (value) {
                let shaderDefine = WebGLEngine._texGammaDefine[index];
                if (shaderDefine && value && value.gammaCorrection > 1) {
                    this.addDefine(shaderDefine);
                }
                else {
                    shaderDefine && this.removeDefine(shaderDefine);
                }
            }
            this._data[index] = value;
            lastValue && lastValue._removeReference();
            value && value._addReference();
        }
        _setInternalTexture(index, value) {
            this._data[index];
            if (value) {
                let shaderDefine = WebGLEngine._texGammaDefine[index];
                if (shaderDefine && value && value.gammaCorrection > 1) {
                    this.addDefine(shaderDefine);
                }
                else {
                    shaderDefine && this.removeDefine(shaderDefine);
                }
            }
            this._data[index] = value;
        }
        getTexture(index) {
            return this._data[index];
        }
        getSourceIndex(value) {
            for (var i in this._data) {
                if (this._data[i] == value)
                    return Number(i);
            }
            return -1;
        }
        setUniformBuffer(index, value) {
            this._data[index] = value;
        }
        getUniformBuffer(index) {
            return this._data[index];
        }
        cloneTo(destObject) {
            let destData = destObject._data;
            for (let k in this._data) {
                let value = this._data[k];
                if (value != null) {
                    if (typeof value == "number") {
                        destData[k] = value;
                    }
                    else if (typeof value == "boolean") {
                        destData[k] = value;
                    }
                    else if (value instanceof Laya.Vector2) {
                        let v2 = destData[k] || (destData[k] = new Laya.Vector2());
                        value.cloneTo(v2);
                    }
                    else if (value instanceof Laya.Vector3) {
                        let v3 = destData[k] || (destData[k] = new Laya.Vector3());
                        value.cloneTo(v3);
                    }
                    else if (value instanceof Laya.Vector4) {
                        let color = this.getColor(parseInt(k));
                        if (color) {
                            let clonecolor = color.clone();
                            destObject.setColor(parseInt(k), clonecolor);
                        }
                        else {
                            let v4 = destData[k] || (destData[k] = new Laya.Vector4());
                            value.cloneTo(v4);
                        }
                    }
                    else if (value instanceof Laya.Matrix3x3) {
                        let mat = destData[k] || (destData[k] = new Laya.Matrix3x3());
                        value.cloneTo(mat);
                    }
                    else if (value instanceof Laya.Matrix4x4) {
                        let mat = destData[k] || (destData[k] = new Laya.Matrix4x4());
                        value.cloneTo(mat);
                    }
                    else if (value instanceof Laya.Resource) {
                        destData[k] = value;
                        value._addReference();
                    }
                }
            }
            this._defineDatas.cloneTo(destObject._defineDatas);
            this._gammaColorMap.forEach((color, index) => {
                destObject._gammaColorMap.set(index, color.clone());
            });
            this._cloneUBO(destObject._uniformBufferDatas);
            destObject.applyUBO = true;
        }
        getDefineData() {
            return this._defineDatas;
        }
        _cloneUBO(uboDatas) {
            this._uniformBufferDatas.forEach((value, key) => {
                uboDatas.has(key) && (value.uboBuffer.cloneTo(uboDatas.get(key).uboBuffer));
            });
        }
        clone() {
            var dest = new WebGLShaderData();
            this.cloneTo(dest);
            return dest;
        }
        reset() {
            for (var k in this._data) {
                var value = this._data[k];
                if (value instanceof Laya.Resource) {
                    value._removeReference();
                }
            }
            this._data = {};
            this._gammaColorMap.clear();
            this._uniformBufferDatas.clear();
            this.applyUBO = false;
            this._uniformBuffersMap.clear();
            this._defineDatas.clear();
        }
        destroy() {
            this._defineDatas.destroy();
            this._defineDatas = null;
            for (var k in this._data) {
                var value = this._data[k];
                if (value instanceof Laya.Resource) {
                    value._removeReference();
                }
            }
            this._data = null;
            this._gammaColorMap.clear();
            this._gammaColorMap = null;
            delete this._uniformBufferDatas;
            delete this._uniformBuffersMap;
            this._uniformBufferDatas = null;
            this._uniformBuffersMap = null;
        }
    }

    class WebShaderPass {
        get renderState() {
            return this._renderState;
        }
        set renderState(value) {
            this._renderState = value;
        }
        get validDefine() {
            return this._validDefine;
        }
        set validDefine(value) {
            this._validDefine = value;
        }
        constructor(pass) {
            this._cacheShaderHierarchy = 1;
            this._cacheSharders = {};
            this._renderState = new Laya.RenderState();
            this._renderState.setNull();
        }
        _resizeCacheShaderMap(cacheMap, hierarchy, resizeLength) {
            var end = this._cacheShaderHierarchy - 1;
            if (hierarchy == end) {
                for (var k in cacheMap) {
                    var shader = cacheMap[k];
                    for (var i = 0, n = resizeLength - end; i < n; i++) {
                        if (i == n - 1)
                            cacheMap[0] = shader;
                        else
                            cacheMap = cacheMap[i == 0 ? k : 0] = {};
                    }
                }
            }
            else {
                ++hierarchy;
                for (var k in cacheMap)
                    this._resizeCacheShaderMap(cacheMap[k], hierarchy, resizeLength);
            }
        }
        setCacheShader(compileDefine, shader) {
            var cacheShaders = this._cacheSharders;
            var mask = compileDefine._mask;
            var endIndex = compileDefine._length - 1;
            var maxEndIndex = this._cacheShaderHierarchy - 1;
            for (var i = 0; i < maxEndIndex; i++) {
                var subMask = endIndex < i ? 0 : mask[i];
                var subCacheShaders = cacheShaders[subMask];
                (subCacheShaders) || (cacheShaders[subMask] = subCacheShaders = {});
                cacheShaders = subCacheShaders;
            }
            var cacheKey = endIndex < maxEndIndex ? 0 : mask[maxEndIndex];
            cacheShaders[cacheKey] = shader;
        }
        getCacheShader(compileDefine) {
            compileDefine._intersectionDefineDatas(this._validDefine);
            var cacheShaders = this._cacheSharders;
            var maskLength = compileDefine._length;
            if (maskLength > this._cacheShaderHierarchy) {
                this._resizeCacheShaderMap(cacheShaders, 0, maskLength);
                this._cacheShaderHierarchy = maskLength;
            }
            var mask = compileDefine._mask;
            var endIndex = compileDefine._length - 1;
            var maxEndIndex = this._cacheShaderHierarchy - 1;
            for (var i = 0; i < maxEndIndex; i++) {
                var subMask = endIndex < i ? 0 : mask[i];
                var subCacheShaders = cacheShaders[subMask];
                (subCacheShaders) || (cacheShaders[subMask] = subCacheShaders = {});
                cacheShaders = subCacheShaders;
            }
            var cacheKey = endIndex < maxEndIndex ? 0 : mask[maxEndIndex];
            var shader = cacheShaders[cacheKey];
            return shader;
        }
        destroy() {
        }
    }

    class WebSubShader {
        destroy() {
            throw new Laya.NotImplementedError();
        }
        addShaderPass(pass) { }
    }

    class WebUnitRenderModuleDataFactory {
        createSubShader() {
            return new WebSubShader();
        }
        createShaderPass(pass) {
            return new WebShaderPass(pass);
        }
        createRenderState() {
            return new Laya.RenderState();
        }
        createDefineDatas() {
            return new WebDefineDatas();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.unitRenderModuleDataFactory)
            Laya.LayaGL.unitRenderModuleDataFactory = new WebUnitRenderModuleDataFactory();
    });

    class WebGLVertexBuffer {
        get vertexDeclaration() {
            return this._vertexDeclaration;
        }
        set vertexDeclaration(value) {
            this._vertexDeclaration = value;
            this._shaderValues = this._vertexDeclaration._shaderValues;
        }
        constructor(targetType, bufferUsageType) {
            this._glBuffer = WebGLEngine.instance.createBuffer(targetType, bufferUsageType);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_VertexBuffer, 1);
        }
        _changeMemory(bytelength) {
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_VertexBuffer, -this._glBuffer._byteLength + bytelength);
        }
        setDataLength(byteLength) {
            this._changeMemory(byteLength);
            this._glBuffer.setDataLength(byteLength);
        }
        setData(buffer, bufferOffset, dataStartIndex, dataCount) {
            this.bind();
            var needSubData = dataStartIndex !== 0 || dataCount !== Number.MAX_SAFE_INTEGER;
            if (needSubData) {
                var subData = new Uint8Array(buffer, dataStartIndex, dataCount);
                this._glBuffer.setData(subData, bufferOffset);
            }
            else {
                this._glBuffer.setData(buffer, bufferOffset);
            }
        }
        bind() {
            return this._glBuffer.bindBuffer();
        }
        unbind() {
            return this._glBuffer.unbindBuffer();
        }
        orphanStorage() {
            this.bind();
            this._glBuffer.setDataLength(this._glBuffer._byteLength);
        }
        destroy() {
            this._glBuffer.destroy();
            this._vertexDeclaration = null;
            this._changeMemory(0);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_VertexBuffer, -1);
        }
    }

    class WebglRenderContext2D {
        constructor() {
            this._clearColor = new Laya.Color(0, 0, 0, 0);
            this.invertY = false;
            this.pipelineMode = "Forward";
            this._globalConfigShaderData = Laya.Shader3D._configDefineValues;
            if (Laya.LayaEnv.isConch && !WebglRenderContext2D.isCreateBlitScreenELement) {
                (!WebglRenderContext2D.isCreateBlitScreenELement) && this.setBlitScreenElement();
                WebglRenderContext2D.blitContext = new WebglRenderContext2D();
                let engine = Laya.LayaGL.renderEngine;
                engine.on("endFrame", () => {
                    let last_main_frame_buffer = WebGLEngine._lastFrameBuffer_WebGLOBJ;
                    let last_main_frame = WebGLEngine._lastFrameBuffer;
                    WebGLEngine._lastFrameBuffer_WebGLOBJ = null;
                    WebGLEngine._lastFrameBuffer = null;
                    WebglRenderContext2D.blitContext.setOffscreenView(engine.getInnerWidth(), engine.getInnerHeight());
                    WebglRenderContext2D.blitContext.setRenderTarget(null, true, Laya.Color.BLACK);
                    WebglRenderContext2D.blitScreenElement.materialShaderData._setInternalTexture(Laya.Shader3D.propertyNameToID("u_MainTex"), last_main_frame._textures[0]);
                    WebglRenderContext2D.blitContext.drawRenderElementOne(WebglRenderContext2D.blitScreenElement);
                    WebGLEngine._lastFrameBuffer_WebGLOBJ = last_main_frame_buffer;
                    WebGLEngine._lastFrameBuffer = last_main_frame;
                    WebGLEngine.instance.getTextureContext().bindRenderTarget(last_main_frame);
                });
            }
        }
        setBlitScreenElement() {
            let blitScreenElement = Laya.LayaGL.render2DRenderPassFactory.createRenderElement2D();
            let shaderData = Laya.LayaGL.renderDeviceFactory.createShaderData();
            let _vertices = new Float32Array([
                1, 1, 1, 1,
                1, -1, 1, 0,
                -1, 1, 0, 1,
                -1, -1, 0, 0
            ]);
            let _vertexBuffer = new WebGLVertexBuffer(Laya.BufferTargetType.ARRAY_BUFFER, Laya.BufferUsage.Dynamic);
            _vertexBuffer.setDataLength(64);
            _vertexBuffer.setData(_vertices.buffer, 0, 0, _vertices.buffer.byteLength);
            let declaration = new Laya.VertexDeclaration(16, [new Laya.VertexElement(0, Laya.VertexElementFormat.Vector4, 0)]);
            _vertexBuffer.vertexDeclaration = declaration;
            let geometry = Laya.LayaGL.renderDeviceFactory.createRenderGeometryElement(Laya.MeshTopology.TriangleStrip, Laya.DrawType.DrawArray);
            geometry.setDrawArrayParams(0, 4);
            let bufferState = Laya.LayaGL.renderDeviceFactory.createBufferState();
            bufferState.applyState([_vertexBuffer], null);
            geometry.bufferState = bufferState;
            let attributeMap = {
                'a_PositionTexcoord': [0, Laya.ShaderDataType.Vector4]
            };
            let uniformMap = {
                "u_MainTex": Laya.ShaderDataType.Texture2D,
            };
            let shader = Laya.Shader3D.add("GLESblitScreen", false, false);
            shader.shaderType = Laya.ShaderFeatureType.D2;
            let subShader = new Laya.SubShader(attributeMap, uniformMap, {});
            shader.addSubShader(subShader);
            let vs = `
            #define SHADER_NAME GLESblitScreenVS

            varying vec2 v_Texcoord0;

            void main()
            {
                gl_Position = vec4(- 1.0 + (a_PositionTexcoord.x + 1.0), (1.0 - ((- 1.0 + (-a_PositionTexcoord.y + 1.0)) + 1.0) / 2.0) * 2.0 - 1.0, 0.0, 1.0);

                v_Texcoord0 = a_PositionTexcoord.zw;
            }
        `;
            let fs = `
            #define SHADER_NAME GLESblitScreenFS

            #include "Color.glsl";

            varying vec2 v_Texcoord0;

            void main()
            {
                vec4 mainColor = texture2D(u_MainTex, v_Texcoord0);
               
                gl_FragColor = mainColor;
            }
        `;
            let pass = subShader.addShaderPass(vs, fs);
            pass.statefirst = true;
            let blitState = pass.renderState;
            blitState.depthTest = Laya.RenderState.DEPTHTEST_ALWAYS;
            blitState.depthWrite = false;
            blitState.cull = Laya.RenderState.CULL_NONE;
            blitState.blend = Laya.RenderState.BLEND_DISABLE;
            blitState.stencilRef = 1;
            blitState.stencilTest = Laya.RenderState.STENCILTEST_OFF;
            blitState.stencilWrite = false;
            blitState.stencilOp = new Laya.Vector3(Laya.RenderState.STENCILOP_KEEP, Laya.RenderState.STENCILOP_KEEP, Laya.RenderState.STENCILOP_REPLACE);
            blitScreenElement.geometry = geometry;
            blitScreenElement.materialShaderData = shaderData;
            blitScreenElement.subShader = subShader;
            blitScreenElement.renderStateIsBySprite = false;
            WebglRenderContext2D.isCreateBlitScreenELement = true;
            WebglRenderContext2D.blitScreenElement = blitScreenElement;
        }
        drawRenderElementList(list) {
            for (var i = 0, n = list.length; i < n; i++) {
                let element = list.elements[i];
                element._prepare(this);
            }
            for (var i = 0, n = list.length; i < n; i++) {
                let element = list.elements[i];
                element._render(this);
            }
            return 0;
        }
        setOffscreenView(width, height) {
            this._offscreenWidth = width;
            this._offscreenHeight = height;
        }
        setRenderTarget(value, clear, clearColor) {
            this._destRT = value;
            clearColor.cloneTo(this._clearColor);
            if (this._destRT) {
                WebGLEngine.instance.getTextureContext().bindRenderTarget(this._destRT);
                WebGLEngine.instance.viewport(0, 0, this._destRT._textures[0].width, this._destRT._textures[0].height);
            }
            else {
                WebGLEngine.instance.getTextureContext().bindoutScreenTarget();
                WebGLEngine.instance.viewport(0, 0, this._offscreenWidth, this._offscreenHeight);
            }
            WebGLEngine.instance.scissorTest(false);
            WebGLEngine.instance.clearRenderTexture(clear ? Laya.RenderClearFlag.Color : Laya.RenderClearFlag.Nothing, this._clearColor);
        }
        drawRenderElementOne(node) {
            node._prepare(this);
            node._render(this);
        }
    }
    WebglRenderContext2D.isCreateBlitScreenELement = false;

    class WebGLRenderelement2D {
        constructor() {
            this.renderStateIsBySprite = true;
            this._shaderInstances = new Laya.FastSinglelist();
        }
        _compileShader(context) {
            var passes = this.subShader._passes;
            this._shaderInstances.clear();
            for (var j = 0, m = passes.length; j < m; j++) {
                var pass = passes[j];
                if (pass.pipelineMode !== context.pipelineMode)
                    continue;
                var comDef = WebGLRenderelement2D._compileDefine;
                if (context.sceneData) {
                    context.sceneData._defineDatas.cloneTo(comDef);
                }
                else {
                    context._globalConfigShaderData.cloneTo(comDef);
                }
                let returnGamma = !(context._destRT) || ((context._destRT)._textures[0].gammaCorrection != 1);
                if (returnGamma) {
                    comDef.add(Laya.ShaderDefines2D.GAMMASPACE);
                }
                else {
                    comDef.remove(Laya.ShaderDefines2D.GAMMASPACE);
                }
                if (context.invertY) {
                    comDef.add(Laya.ShaderDefines2D.INVERTY);
                }
                else {
                    comDef.remove(Laya.ShaderDefines2D.INVERTY);
                }
                if (this.value2DShaderData) {
                    comDef.addDefineDatas(this.value2DShaderData.getDefineData());
                }
                if (this.materialShaderData)
                    comDef.addDefineDatas(this.materialShaderData._defineDatas);
                var shaderIns = pass.withCompile(comDef, true);
                this._shaderInstances.add(shaderIns);
            }
        }
        _prepare(context) {
            this._compileShader(context);
        }
        _render(context) {
            if (this._shaderInstances.length == 1) {
                this.renderByShaderInstance(this._shaderInstances.elements[0], context);
            }
            else {
                var passes = this._shaderInstances.elements;
                for (var j = 0, m = this._shaderInstances.length; j < m; j++) {
                    this.renderByShaderInstance(passes[j], context);
                }
            }
        }
        renderByShaderInstance(shader, context) {
            if (!shader.complete)
                return;
            shader.bind();
            this.value2DShaderData && shader.uploadUniforms(shader._sprite2DUniformParamsMap, this.value2DShaderData, true);
            context.sceneData && shader.uploadUniforms(shader._sceneUniformParamsMap, context.sceneData, true);
            this.materialShaderData && shader.uploadUniforms(shader._materialUniformParamsMap, this.materialShaderData, true);
            if (this.renderStateIsBySprite || !this.materialShaderData) {
                shader.uploadRenderStateBlendDepth(this.value2DShaderData);
                shader.uploadRenderStateFrontFace(this.value2DShaderData, false, context.invertY);
            }
            else {
                shader.uploadRenderStateBlendDepth(this.materialShaderData);
                shader.uploadRenderStateFrontFace(this.materialShaderData, false, context.invertY);
            }
            WebGLEngine.instance.getDrawContext().drawGeometryElement(this.geometry);
        }
        destroy() {
        }
    }
    WebGLRenderelement2D._compileDefine = new WebDefineDatas();

    class WebGLRender2DProcess {
        createRenderElement2D() {
            return new WebGLRenderelement2D();
        }
        createRenderContext2D() {
            return new WebglRenderContext2D();
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.render2DRenderPassFactory)
            Laya.LayaGL.render2DRenderPassFactory = new WebGLRender2DProcess();
    });

    class WebGLBufferState {
        constructor() {
            this._glVertexState = WebGLEngine.instance.createVertexState();
        }
        applyVertexBuffers() {
            this._glVertexState.applyVertexBuffer(this._vertexBuffers);
        }
        applyIndexBuffers() {
            this._glVertexState.applyIndexBuffer(this._bindedIndexBuffer);
        }
        applyState(vertexBuffers, indexBuffer) {
            this._vertexBuffers = vertexBuffers.slice();
            this._bindedIndexBuffer = indexBuffer;
            indexBuffer && indexBuffer._glBuffer.unbindBuffer();
            this.bind();
            this.applyVertexBuffers();
            this.applyIndexBuffers();
            this.unBind();
            indexBuffer && indexBuffer._glBuffer.unbindBuffer();
        }
        bind() {
            this._glVertexState.bindVertexArray();
            WebGLBufferState._curBindedBufferState = this;
        }
        unBind() {
            if (WebGLBufferState._curBindedBufferState == this) {
                this._glVertexState.unbindVertexArray();
                WebGLBufferState._curBindedBufferState = null;
            }
            else {
                throw "BufferState: must call bind() function first.";
            }
        }
        isBind() {
            return (WebGLBufferState._curBindedBufferState == this);
        }
        destroy() {
            if (WebGLBufferState._curBindedBufferState == this) {
                this._glVertexState.unbindVertexArray();
                WebGLBufferState._curBindedBufferState = null;
            }
            this._glVertexState.destroy();
            this._vertexBuffers = null;
            this._bindedIndexBuffer = null;
        }
    }

    class WebGLCommandUniformMap extends Laya.CommandUniformMap {
        constructor(stateName) {
            super(stateName);
            this._idata = {};
            this._stateName = stateName;
        }
        hasPtrID(propertyID) {
            return !!(this._idata[propertyID] != null);
        }
        addShaderUniform(propertyID, propertyKey, uniformtype, block = "") {
            this._idata[propertyID] = { uniformtype: uniformtype, propertyName: propertyKey, arrayLength: 0, block: block, blockProperty: null };
        }
        addShaderUniformArray(propertyID, propertyName, uniformtype, arrayLength, block = "") {
            if (uniformtype !== Laya.ShaderDataType.Matrix4x4 && uniformtype !== Laya.ShaderDataType.Vector4)
                throw ('because of align rule, the engine does not support other types as arrays.');
            this._idata[propertyID] = { uniformtype, propertyName, arrayLength, block, blockProperty: null };
        }
        addShaderBlockUniform(propertyID, blockname, blockProperty) {
            this._idata[propertyID] = { propertyName: blockname, arrayLength: 0, blockProperty: blockProperty, uniformtype: Laya.ShaderDataType.None, block: "" };
            blockProperty.forEach(element => {
                this.addShaderUniform(element.id, element.propertyName, element.uniformtype, blockname);
            });
        }
    }

    class WebGLIndexBuffer {
        constructor(targetType, bufferUsageType) {
            this._glBuffer = this._glBuffer = WebGLEngine.instance.createBuffer(targetType, bufferUsageType);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_IndexBuffer, 1);
        }
        _changeMemory(bytelength) {
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.M_IndexBuffer, -this._glBuffer._byteLength + bytelength);
        }
        _setIndexDataLength(data) {
            this._changeMemory(data);
            var curBufSta = WebGLBufferState._curBindedBufferState;
            if (curBufSta) {
                curBufSta.unBind();
                this._glBuffer.bindBuffer();
                this._glBuffer.setDataLength(data);
                curBufSta.bind();
            }
            else {
                this._glBuffer.bindBuffer();
                this._glBuffer.setDataLength(data);
            }
        }
        _setIndexData(data, bufferOffset) {
            var curBufSta = WebGLBufferState._curBindedBufferState;
            if (curBufSta) {
                curBufSta.unBind();
                this._glBuffer.bindBuffer();
                this._glBuffer.setData(data, bufferOffset);
                curBufSta.bind();
            }
            else {
                this._glBuffer.bindBuffer();
                this._glBuffer.setData(data, bufferOffset);
            }
        }
        destroy() {
            this._glBuffer.destroy();
            this._changeMemory(0);
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.RC_IndexBuffer, -1);
        }
    }

    class WebGLRenderGeometryElement {
        get indexFormat() {
            return this._indexFormat;
        }
        set indexFormat(value) {
            this._indexFormat = value;
            this._glindexFormat = WebGLEngine.instance.getDrawContext().getIndexType(this._indexFormat);
        }
        get mode() {
            return this._mode;
        }
        set mode(value) {
            this._mode = value;
            this._glmode = WebGLEngine.instance.getDrawContext().getMeshTopology(this._mode);
        }
        constructor(mode, drawType) {
            this._id = ++WebGLRenderGeometryElement._idCounter;
            this.mode = mode;
            this.drawParams = new Laya.FastSinglelist();
            this.drawType = drawType;
        }
        setDrawArrayParams(first, count) {
            this.drawParams.add(first);
            this.drawParams.add(count);
        }
        setDrawElemenParams(count, offset) {
            this.drawParams.add(offset);
            this.drawParams.add(count);
        }
        destroy() {
            delete this.drawParams;
        }
        clearRenderParams() {
            this.drawParams.length = 0;
        }
        cloneTo(obj) {
            obj.mode = this.mode;
            obj.drawType = this.drawType;
            obj.indexFormat = this.indexFormat;
            obj.instanceCount = this.instanceCount;
            obj.drawParams.elements = this.drawParams.elements.slice();
            obj.drawParams.length = this.drawParams.length;
        }
    }
    WebGLRenderGeometryElement._idCounter = 0;

    class WebGLShaderInstance {
        constructor() {
            this._customUniformParamsMap = [];
            this._uploadMark = -1;
            this._uploadRenderType = -1;
        }
        get complete() {
            return this._renderShaderInstance._complete;
        }
        _create(shaderProcessInfo, shaderPass) {
            let shaderObj = Laya.GLSLCodeGenerator.GLShaderLanguageProcess3D(shaderProcessInfo.defineString, shaderProcessInfo.attributeMap, shaderProcessInfo.uniformMap, shaderProcessInfo.vs, shaderProcessInfo.ps);
            this._renderShaderInstance = WebGLEngine.instance.createShaderInstance(shaderObj.vs, shaderObj.fs, shaderProcessInfo.attributeMap);
            if (this._renderShaderInstance._complete) {
                this._shaderPass = shaderPass;
                shaderProcessInfo.is2D ? this._create2D() : this._create3D();
            }
        }
        _create3D() {
            this._sceneUniformParamsMap = new Laya.CommandEncoder();
            this._cameraUniformParamsMap = new Laya.CommandEncoder();
            this._spriteUniformParamsMap = new Laya.CommandEncoder();
            this._materialUniformParamsMap = new Laya.CommandEncoder();
            const sceneParams = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Scene3D");
            const cameraParams = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("BaseCamera");
            const customParams = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Custom");
            let i, n;
            let data = this._renderShaderInstance.getUniformMap();
            for (i = 0, n = data.length; i < n; i++) {
                let one = data[i];
                if (sceneParams.hasPtrID(one.dataOffset)) {
                    this._sceneUniformParamsMap.addShaderUniform(one);
                }
                else if (cameraParams.hasPtrID(one.dataOffset)) {
                    this._cameraUniformParamsMap.addShaderUniform(one);
                }
                else if (this.hasSpritePtrID(one.dataOffset)) {
                    this._spriteUniformParamsMap.addShaderUniform(one);
                }
                else if (customParams.hasPtrID(one.dataOffset)) {
                    this._customUniformParamsMap || (this._customUniformParamsMap = []);
                    this._customUniformParamsMap[one.dataOffset] = one;
                }
                else {
                    this._materialUniformParamsMap.addShaderUniform(one);
                }
            }
        }
        _create2D() {
            this._sprite2DUniformParamsMap = new Laya.CommandEncoder();
            this._materialUniformParamsMap = new Laya.CommandEncoder();
            this._sceneUniformParamsMap = new Laya.CommandEncoder();
            const sprite2DParms = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Sprite2D");
            const sceneParms = Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap("Sprite2DGlobal");
            let i, n;
            let data = this._renderShaderInstance.getUniformMap();
            for (i = 0, n = data.length; i < n; i++) {
                let one = data[i];
                if (sprite2DParms.hasPtrID(one.dataOffset)) {
                    this._sprite2DUniformParamsMap.addShaderUniform(one);
                }
                else if (sceneParms.hasPtrID(one.dataOffset)) {
                    this._sceneUniformParamsMap.addShaderUniform(one);
                }
                else {
                    this._materialUniformParamsMap.addShaderUniform(one);
                }
            }
        }
        hasSpritePtrID(dataOffset) {
            let commap = this._shaderPass.nodeCommonMap;
            if (!commap) {
                return false;
            }
            else {
                for (let i = 0, n = commap.length; i < n; i++) {
                    if (Laya.LayaGL.renderDeviceFactory.createGlobalUniformMap(commap[i]).hasPtrID(dataOffset))
                        return true;
                }
                return false;
            }
        }
        _disposeResource() {
            this._renderShaderInstance.destroy();
            this._sceneUniformParamsMap = null;
            this._cameraUniformParamsMap = null;
            this._spriteUniformParamsMap = null;
            this._materialUniformParamsMap = null;
            this._customUniformParamsMap = null;
            this._uploadMaterial = null;
            this._uploadRender = null;
            this._uploadCameraShaderValue = null;
            this._uploadScene = null;
        }
        bind() {
            return this._renderShaderInstance.bind();
        }
        uploadUniforms(shaderUniform, shaderDatas, uploadUnTexture) {
            WebGLEngine.instance._addStatisticsInfo(Laya.GPUEngineStatisticsInfo.C_UniformBufferUploadCount, WebGLEngine.instance.uploadUniforms(this._renderShaderInstance, shaderUniform, shaderDatas, uploadUnTexture));
        }
        uploadRenderStateBlendDepth(shaderDatas) {
            if (this._shaderPass.statefirst)
                this.uploadRenderStateBlendDepthByShader(shaderDatas);
            else
                this.uploadRenderStateBlendDepthByMaterial(shaderDatas);
        }
        uploadRenderStateBlendDepthByShader(shaderDatas) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
            var datas = shaderDatas._data;
            var renderState = this._shaderPass.renderState;
            var depthWrite = (_b = ((_a = renderState.depthWrite) !== null && _a !== void 0 ? _a : datas[Laya.Shader3D.DEPTH_WRITE])) !== null && _b !== void 0 ? _b : Laya.RenderState.Default.depthWrite;
            Laya.RenderStateContext.setDepthMask(depthWrite);
            var depthTest = (_d = ((_c = renderState.depthTest) !== null && _c !== void 0 ? _c : datas[Laya.Shader3D.DEPTH_TEST])) !== null && _d !== void 0 ? _d : Laya.RenderState.Default.depthTest;
            if (depthTest == Laya.RenderState.DEPTHTEST_OFF)
                Laya.RenderStateContext.setDepthTest(false);
            else {
                Laya.RenderStateContext.setDepthTest(true);
                Laya.RenderStateContext.setDepthFunc(depthTest);
            }
            var stencilWrite = (_f = ((_e = renderState.stencilWrite) !== null && _e !== void 0 ? _e : datas[Laya.Shader3D.STENCIL_WRITE])) !== null && _f !== void 0 ? _f : Laya.RenderState.Default.stencilWrite;
            var stencilTest = (_h = ((_g = renderState.stencilTest) !== null && _g !== void 0 ? _g : datas[Laya.Shader3D.STENCIL_TEST])) !== null && _h !== void 0 ? _h : Laya.RenderState.Default.stencilTest;
            Laya.RenderStateContext.setStencilMask(stencilWrite);
            if (stencilWrite) {
                var stencilOp = (_k = ((_j = renderState.stencilOp) !== null && _j !== void 0 ? _j : datas[Laya.Shader3D.STENCIL_Op])) !== null && _k !== void 0 ? _k : Laya.RenderState.Default.stencilOp;
                Laya.RenderStateContext.setstencilOp(stencilOp.x, stencilOp.y, stencilOp.z);
            }
            if (stencilTest == Laya.RenderState.STENCILTEST_OFF) {
                Laya.RenderStateContext.setStencilTest(false);
            }
            else {
                var stencilRef = (_m = ((_l = renderState.stencilRef) !== null && _l !== void 0 ? _l : datas[Laya.Shader3D.STENCIL_Ref])) !== null && _m !== void 0 ? _m : Laya.RenderState.Default.stencilRef;
                Laya.RenderStateContext.setStencilTest(true);
                Laya.RenderStateContext.setStencilFunc(stencilTest, stencilRef);
            }
            var blend = (_p = ((_o = renderState.blend) !== null && _o !== void 0 ? _o : datas[Laya.Shader3D.BLEND])) !== null && _p !== void 0 ? _p : Laya.RenderState.Default.blend;
            switch (blend) {
                case Laya.RenderState.BLEND_DISABLE:
                    Laya.RenderStateContext.setBlend(false);
                    break;
                case Laya.RenderState.BLEND_ENABLE_ALL:
                    var blendEquation = (_r = ((_q = renderState.blendEquation) !== null && _q !== void 0 ? _q : datas[Laya.Shader3D.BLEND_EQUATION])) !== null && _r !== void 0 ? _r : Laya.RenderState.Default.blendEquation;
                    var srcBlend = (_t = ((_s = renderState.srcBlend) !== null && _s !== void 0 ? _s : datas[Laya.Shader3D.BLEND_SRC])) !== null && _t !== void 0 ? _t : Laya.RenderState.Default.srcBlend;
                    var dstBlend = (_v = ((_u = renderState.dstBlend) !== null && _u !== void 0 ? _u : datas[Laya.Shader3D.BLEND_DST])) !== null && _v !== void 0 ? _v : Laya.RenderState.Default.dstBlend;
                    Laya.RenderStateContext.setBlend(true);
                    Laya.RenderStateContext.setBlendEquation(blendEquation);
                    Laya.RenderStateContext.setBlendFunc(srcBlend, dstBlend);
                    break;
                case Laya.RenderState.BLEND_ENABLE_SEPERATE:
                    var blendEquationRGB = (_x = ((_w = renderState.blendEquationRGB) !== null && _w !== void 0 ? _w : datas[Laya.Shader3D.BLEND_EQUATION_RGB])) !== null && _x !== void 0 ? _x : Laya.RenderState.Default.blendEquationRGB;
                    var blendEquationAlpha = (_z = ((_y = renderState.blendEquationAlpha) !== null && _y !== void 0 ? _y : datas[Laya.Shader3D.BLEND_EQUATION_ALPHA])) !== null && _z !== void 0 ? _z : Laya.RenderState.Default.blendEquationAlpha;
                    var srcRGB = (_1 = ((_0 = renderState.srcBlendRGB) !== null && _0 !== void 0 ? _0 : datas[Laya.Shader3D.BLEND_SRC_RGB])) !== null && _1 !== void 0 ? _1 : Laya.RenderState.Default.srcBlendRGB;
                    var dstRGB = (_3 = ((_2 = renderState.dstBlendRGB) !== null && _2 !== void 0 ? _2 : datas[Laya.Shader3D.BLEND_DST_RGB])) !== null && _3 !== void 0 ? _3 : Laya.RenderState.Default.dstBlendRGB;
                    var srcAlpha = (_5 = ((_4 = renderState.srcBlendAlpha) !== null && _4 !== void 0 ? _4 : datas[Laya.Shader3D.BLEND_SRC_ALPHA])) !== null && _5 !== void 0 ? _5 : Laya.RenderState.Default.srcBlendAlpha;
                    var dstAlpha = (_7 = ((_6 = renderState.dstBlendAlpha) !== null && _6 !== void 0 ? _6 : datas[Laya.Shader3D.BLEND_DST_ALPHA])) !== null && _7 !== void 0 ? _7 : Laya.RenderState.Default.dstBlendAlpha;
                    Laya.RenderStateContext.setBlend(true);
                    Laya.RenderStateContext.setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha);
                    Laya.RenderStateContext.setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha);
                    break;
            }
        }
        uploadRenderStateBlendDepthByMaterial(shaderDatas) {
            var datas = shaderDatas.getData();
            var depthWrite = datas[Laya.Shader3D.DEPTH_WRITE];
            depthWrite = depthWrite !== null && depthWrite !== void 0 ? depthWrite : Laya.RenderState.Default.depthWrite;
            Laya.RenderStateContext.setDepthMask(depthWrite);
            var depthTest = datas[Laya.Shader3D.DEPTH_TEST];
            depthTest = depthTest !== null && depthTest !== void 0 ? depthTest : Laya.RenderState.Default.depthTest;
            if (depthTest === Laya.RenderState.DEPTHTEST_OFF) {
                Laya.RenderStateContext.setDepthTest(false);
            }
            else {
                Laya.RenderStateContext.setDepthTest(true);
                Laya.RenderStateContext.setDepthFunc(depthTest);
            }
            var stencilWrite = datas[Laya.Shader3D.STENCIL_WRITE];
            stencilWrite = stencilWrite !== null && stencilWrite !== void 0 ? stencilWrite : Laya.RenderState.Default.stencilWrite;
            Laya.RenderStateContext.setStencilMask(stencilWrite);
            if (stencilWrite) {
                var stencilOp = datas[Laya.Shader3D.STENCIL_Op];
                stencilOp = stencilOp !== null && stencilOp !== void 0 ? stencilOp : Laya.RenderState.Default.stencilOp;
                Laya.RenderStateContext.setstencilOp(stencilOp.x, stencilOp.y, stencilOp.z);
            }
            var stencilTest = datas[Laya.Shader3D.STENCIL_TEST];
            stencilTest = stencilTest !== null && stencilTest !== void 0 ? stencilTest : Laya.RenderState.Default.stencilTest;
            if (stencilTest == Laya.RenderState.STENCILTEST_OFF) {
                Laya.RenderStateContext.setStencilTest(false);
            }
            else {
                var stencilRef = datas[Laya.Shader3D.STENCIL_Ref];
                stencilRef = stencilRef !== null && stencilRef !== void 0 ? stencilRef : Laya.RenderState.Default.stencilRef;
                Laya.RenderStateContext.setStencilTest(true);
                Laya.RenderStateContext.setStencilFunc(stencilTest, stencilRef);
            }
            var blend = datas[Laya.Shader3D.BLEND];
            blend = blend !== null && blend !== void 0 ? blend : Laya.RenderState.Default.blend;
            switch (blend) {
                case Laya.RenderState.BLEND_ENABLE_ALL:
                    var blendEquation = datas[Laya.Shader3D.BLEND_EQUATION];
                    blendEquation = blendEquation !== null && blendEquation !== void 0 ? blendEquation : Laya.RenderState.Default.blendEquation;
                    var srcBlend = datas[Laya.Shader3D.BLEND_SRC];
                    srcBlend = srcBlend !== null && srcBlend !== void 0 ? srcBlend : Laya.RenderState.Default.srcBlend;
                    var dstBlend = datas[Laya.Shader3D.BLEND_DST];
                    dstBlend = dstBlend !== null && dstBlend !== void 0 ? dstBlend : Laya.RenderState.Default.dstBlend;
                    Laya.RenderStateContext.setBlend(true);
                    Laya.RenderStateContext.setBlendEquation(blendEquation);
                    Laya.RenderStateContext.setBlendFunc(srcBlend, dstBlend);
                    break;
                case Laya.RenderState.BLEND_ENABLE_SEPERATE:
                    var blendEquationRGB = datas[Laya.Shader3D.BLEND_EQUATION_RGB];
                    blendEquationRGB = blendEquationRGB !== null && blendEquationRGB !== void 0 ? blendEquationRGB : Laya.RenderState.Default.blendEquationRGB;
                    var blendEquationAlpha = datas[Laya.Shader3D.BLEND_EQUATION_ALPHA];
                    blendEquationAlpha = blendEquationAlpha !== null && blendEquationAlpha !== void 0 ? blendEquationAlpha : Laya.RenderState.Default.blendEquationAlpha;
                    var srcRGB = datas[Laya.Shader3D.BLEND_SRC_RGB];
                    srcRGB = srcRGB !== null && srcRGB !== void 0 ? srcRGB : Laya.RenderState.Default.srcBlendRGB;
                    var dstRGB = datas[Laya.Shader3D.BLEND_DST_RGB];
                    dstRGB = dstRGB !== null && dstRGB !== void 0 ? dstRGB : Laya.RenderState.Default.dstBlendRGB;
                    var srcAlpha = datas[Laya.Shader3D.BLEND_SRC_ALPHA];
                    srcAlpha = srcAlpha !== null && srcAlpha !== void 0 ? srcAlpha : Laya.RenderState.Default.srcBlendAlpha;
                    var dstAlpha = datas[Laya.Shader3D.BLEND_DST_ALPHA];
                    dstAlpha = dstAlpha !== null && dstAlpha !== void 0 ? dstAlpha : Laya.RenderState.Default.dstBlendAlpha;
                    Laya.RenderStateContext.setBlend(true);
                    Laya.RenderStateContext.setBlendEquationSeparate(blendEquationRGB, blendEquationAlpha);
                    Laya.RenderStateContext.setBlendFuncSeperate(srcRGB, dstRGB, srcAlpha, dstAlpha);
                    break;
                case Laya.RenderState.BLEND_DISABLE:
                default:
                    Laya.RenderStateContext.setBlend(false);
                    break;
            }
        }
        uploadRenderStateFrontFace(shaderDatas, isTarget, invertFront) {
            var _a;
            var renderState = this._shaderPass.renderState;
            var datas = shaderDatas.getData();
            var cull = datas[Laya.Shader3D.CULL];
            if (this._shaderPass.statefirst) {
                cull = (_a = renderState.cull) !== null && _a !== void 0 ? _a : cull;
            }
            cull = cull !== null && cull !== void 0 ? cull : Laya.RenderState.Default.cull;
            var forntFace;
            switch (cull) {
                case Laya.RenderState.CULL_NONE:
                    Laya.RenderStateContext.setCullFace(false);
                    if (isTarget != invertFront)
                        forntFace = Laya.CullMode.Front;
                    else
                        forntFace = Laya.CullMode.Back;
                    Laya.RenderStateContext.setFrontFace(forntFace);
                    break;
                case Laya.RenderState.CULL_FRONT:
                    Laya.RenderStateContext.setCullFace(true);
                    if (isTarget == invertFront)
                        forntFace = Laya.CullMode.Front;
                    else
                        forntFace = Laya.CullMode.Back;
                    Laya.RenderStateContext.setFrontFace(forntFace);
                    break;
                case Laya.RenderState.CULL_BACK:
                default:
                    Laya.RenderStateContext.setCullFace(true);
                    if (isTarget != invertFront)
                        forntFace = Laya.CullMode.Front;
                    else
                        forntFace = Laya.CullMode.Back;
                    Laya.RenderStateContext.setFrontFace(forntFace);
                    break;
            }
        }
        uploadCustomUniform(index, data) {
            WebGLEngine.instance.uploadCustomUniforms(this._renderShaderInstance, this._customUniformParamsMap, index, data);
        }
    }

    class WebGLRenderDeviceFactory {
        constructor() {
            this.globalBlockMap = {};
        }
        createShaderData(ownerResource) {
            return new WebGLShaderData(ownerResource);
        }
        createShaderInstance(shaderProcessInfo, shaderPass) {
            let shaderIns = new WebGLShaderInstance();
            shaderIns._create(shaderProcessInfo, shaderPass);
            return shaderIns;
        }
        createIndexBuffer(bufferUsageType) {
            return new WebGLIndexBuffer(Laya.BufferTargetType.ELEMENT_ARRAY_BUFFER, bufferUsageType);
        }
        createVertexBuffer(bufferUsageType) {
            return new WebGLVertexBuffer(Laya.BufferTargetType.ARRAY_BUFFER, bufferUsageType);
        }
        createBufferState() {
            return new WebGLBufferState();
        }
        createRenderGeometryElement(mode, drawType) {
            return new WebGLRenderGeometryElement(mode, drawType);
        }
        createGlobalUniformMap(blockName) {
            let comMap = this.globalBlockMap[blockName];
            if (!comMap)
                comMap = this.globalBlockMap[blockName] = new WebGLCommandUniformMap(blockName);
            return comMap;
        }
        createEngine(config, canvas) {
            let engine;
            let glConfig = { stencil: Laya.Config.isStencil, alpha: Laya.Config.isAlpha, antialias: Laya.Config.isAntialias, premultipliedAlpha: Laya.Config.premultipliedAlpha, preserveDrawingBuffer: Laya.Config.preserveDrawingBuffer, depth: Laya.Config.isDepth, failIfMajorPerformanceCaveat: Laya.Config.isfailIfMajorPerformanceCaveat, powerPreference: Laya.Config.powerPreference };
            const webglMode = Laya.Config.useWebGL2 ? exports.WebGLMode.Auto : exports.WebGLMode.WebGL1;
            engine = new WebGLEngine(glConfig, webglMode);
            engine.initRenderEngine(canvas._source);
            var gl = engine._context;
            if (Laya.Config.printWebglOrder)
                this._replaceWebglcall(gl);
            if (gl) {
                new Laya.LayaGL();
            }
            Laya.LayaGL.renderEngine = engine;
            Laya.LayaGL.textureContext = engine.getTextureContext();
            return Promise.resolve();
        }
        _replaceWebglcall(gl) {
            var tempgl = {};
            for (const key in gl) {
                if (typeof gl[key] == "function" && key != "getError" && key != "__SPECTOR_Origin_getError" && key != "__proto__") {
                    tempgl[key] = gl[key];
                    gl[key] = function () {
                        let arr = [];
                        for (let i = 0; i < arguments.length; i++) {
                            arr.push(arguments[i]);
                        }
                        let result = tempgl[key].apply(gl, arr);
                        let err = gl.getError();
                        if (err) {
                            debugger;
                        }
                        return result;
                    };
                }
            }
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.renderDeviceFactory)
            Laya.LayaGL.renderDeviceFactory = new WebGLRenderDeviceFactory();
    });

    class WebGLRenderEngineFactory {
        constructor() {
            this.globalBlockMap = {};
        }
        createUniformBufferObject(glPointer, name, bufferUsage, byteLength, isSingle) {
            return new Laya.UniformBufferObject(glPointer, name, bufferUsage, byteLength, isSingle);
        }
        createEngine(config, canvas) {
            let engine;
            let glConfig = { stencil: Laya.Config.isStencil, alpha: Laya.Config.isAlpha, antialias: Laya.Config.isAntialias, premultipliedAlpha: Laya.Config.premultipliedAlpha, preserveDrawingBuffer: Laya.Config.preserveDrawingBuffer, depth: Laya.Config.isDepth, failIfMajorPerformanceCaveat: Laya.Config.isfailIfMajorPerformanceCaveat, powerPreference: Laya.Config.powerPreference };
            const webglMode = Laya.Config.useWebGL2 ? exports.WebGLMode.Auto : exports.WebGLMode.WebGL1;
            engine = new WebGLEngine(glConfig, webglMode);
            engine.initRenderEngine(canvas._source);
            var gl = engine._context;
            if (Laya.Config.printWebglOrder)
                this._replaceWebglcall(gl);
            if (gl) {
                new Laya.LayaGL();
            }
            Laya.LayaGL.renderEngine = engine;
            Laya.LayaGL.textureContext = engine.getTextureContext();
            return Promise.resolve();
        }
        _replaceWebglcall(gl) {
            var tempgl = {};
            for (const key in gl) {
                if (typeof gl[key] == "function" && key != "getError" && key != "__SPECTOR_Origin_getError" && key != "__proto__") {
                    tempgl[key] = gl[key];
                    gl[key] = function () {
                        let arr = [];
                        for (let i = 0; i < arguments.length; i++) {
                            arr.push(arguments[i]);
                        }
                        let result = tempgl[key].apply(gl, arr);
                        let err = gl.getError();
                        if (err) {
                            debugger;
                        }
                        return result;
                    };
                }
            }
        }
    }
    Laya.Laya.addBeforeInitCallback(() => {
        if (!Laya.LayaGL.renderOBJCreate)
            Laya.LayaGL.renderOBJCreate = new WebGLRenderEngineFactory();
    });

    class WebGLConfig {
    }

    exports.GL2TextureContext = GL2TextureContext;
    exports.GLBuffer = GLBuffer;
    exports.GLObject = GLObject;
    exports.GLParams = GLParams;
    exports.GLRenderDrawContext = GLRenderDrawContext;
    exports.GLRenderState = GLRenderState;
    exports.GLShaderInstance = GLShaderInstance;
    exports.GLTextureContext = GLTextureContext;
    exports.GLVertexState = GLVertexState;
    exports.GlCapable = GlCapable;
    exports.VertexArrayObject = VertexArrayObject;
    exports.WebDefineDatas = WebDefineDatas;
    exports.WebGLBufferState = WebGLBufferState;
    exports.WebGLCommandUniformMap = WebGLCommandUniformMap;
    exports.WebGLConfig = WebGLConfig;
    exports.WebGLEngine = WebGLEngine;
    exports.WebGLIndexBuffer = WebGLIndexBuffer;
    exports.WebGLInternalRT = WebGLInternalRT;
    exports.WebGLInternalTex = WebGLInternalTex;
    exports.WebGLRender2DProcess = WebGLRender2DProcess;
    exports.WebGLRenderDeviceFactory = WebGLRenderDeviceFactory;
    exports.WebGLRenderEngineFactory = WebGLRenderEngineFactory;
    exports.WebGLRenderGeometryElement = WebGLRenderGeometryElement;
    exports.WebGLRenderelement2D = WebGLRenderelement2D;
    exports.WebGLShaderData = WebGLShaderData;
    exports.WebGLShaderInstance = WebGLShaderInstance;
    exports.WebGLVertexBuffer = WebGLVertexBuffer;
    exports.WebShaderPass = WebShaderPass;
    exports.WebSubShader = WebSubShader;
    exports.WebUnitRenderModuleDataFactory = WebUnitRenderModuleDataFactory;
    exports.WebglRenderContext2D = WebglRenderContext2D;

})(window.Laya = window.Laya || {}, Laya);
//# sourceMappingURL=laya.webgl_2D.js.map
